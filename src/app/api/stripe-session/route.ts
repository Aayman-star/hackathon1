import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
// import { getCookie } from "cookies-next";


const key = process.env.STRIPE_SECRET_KEY || '';
const stripe = new Stripe(key,{
    apiVersion:'2023-08-16'
})

export const POST = async(request:NextRequest) =>{


    const body = await request.json();
    //const userId = getCookie('user_id',{req,res}) as string;

 //   console.log(`USER ID IN STRIPE API`,userId)
    // console.log(`Reeived Data in Stripe API:`,body)

    // const customer = await stripe.customers.create({
    //     metadata:{
    //         userId:userId
    //     },
    // })
    try{
        if(body.length > 0 ){
            const session = await stripe.checkout.sessions.create({
                submit_type:'pay',
                mode:'payment',
                payment_method_types:['card'],
                billing_address_collection:'auto',
                shipping_options:[{
                    shipping_rate:'shr_1NpzU1Im7bh8CPHFjNgx1T1v',
                },{shipping_rate:'shr_1NpzWsIm7bh8CPHFAuHpcfzj'}],
                invoice_creation:{
                    enabled:true,
                },
                line_items: body.map((item:any)=>{
                    return{
                        price_data:{
                            currency:'usd',
                            product_data:{
                                name:item.product_name,
                              },
                            unit_amount:item.price * 100,
                            
},
                        
                        adjustable_quantity:{
                            enabled:true,
                            minimum:1,
                            maximum:10,
                        },
                        quantity:item.quantity,
                    }

                }),
                
                //customer:customer.id,
                success_url : `${request.headers.get('origin')}/success`,
                cancel_url : `${request.headers.get('origin')}/cart`
             
            });
            
            return NextResponse.json({session});
         
        }else{
            return NextResponse.json({Message:`something is wrong`})
        }
    }
    catch(error:any){
        console.log(error)
        return NextResponse.json(error.message);


    }
}
  //images:[item.image],