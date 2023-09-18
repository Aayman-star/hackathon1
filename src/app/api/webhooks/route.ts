import { headers } from "next/headers";
import Stripe from "stripe";
import { db,cartTable } from "@/lib1/drizzle";
import { eq,and, asc } from "drizzle-orm";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const POST = async(req : any,res:any) =>{
   
    const headersList  =  headers();
    const cookie1 = cookies().get('user_id')?.value as string
    // console.log(`COOKIE------,`,cookie1)
    // console.log(`HEADER DATA IN WEBHOOK:`,headersList)
    try{
        const rawBody = await req.text();
        // const cookieFetched = getCookie('user_id',{req,res})
        // console.log(`FETCHED COOKIE=============,`,cookieFetched)
        // console.log(`HERE IS THE RAW BODY:`,rawBody);
        const sign = headersList.get('stripe-signature')
        // console.log(`STRIPE SIGN------`,sign)

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
            apiVersion:'2023-08-16'
        })

        let event;
        try{
            if(!sign || !endPointSecret){
                return new Response(`Webhook signature or End Point Secret missing`),{status:400}
            }
            else{
                event = stripe.webhooks.constructEvent(
                    rawBody.toString(),
                    sign,
                    endPointSecret
                )

            }
         
        }catch(error:any){
            // console.log(`ERROR IN WEBHOOK,`,error)
            return new Response('WebHook Signature OR End Point secret missing'),{status:400}
        }
        if(`checkout.session.completed` === event.type){
            const session = event.data.object;
           // @ts-ignore
            const customerData = await stripe.customers.retrieve(session.customer);
            // console.log(`CUSTOMER DATA---------,`,customerData)
             
            //const testCookie = cookies()
            // @ts-ignore
            const userId = customerData.metadata.user_id
            //@ts-ignore
            // console.log(`CUSTOMER METADATA-----`,customerData.metadata)
            //req.cookies.user_id;
            // cookies().get('user_id')?.value as string;
            // console.log(`USERID:`,userId)
         
            await db.delete(cartTable).where(eq(cartTable.user_id,userId));
            
             
            

            // console.log(`Successful payment`,session);
             // @ts-ignore
            const line_items = await stripe.checkout.sessions.listLineItems(event.data.object!.id)

            return new Response(`PAYMENT CONFIRMATION RECEIVED`)
        }else{
            res.setHeader('Allow','POST')
        }
    }
    catch(error)
    {
        // console.log(`Error in Webhook---------`,error)
        return
    }

}