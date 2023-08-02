 import { NextRequest,NextResponse } from "next/server";
 import { db,cartTable } from "@/lib1/drizzle";

 import {v4 as uuid} from 'uuid'
 import { cookies } from "next/headers";
import { equal } from "assert";
import { Equal } from "lucide-react";
import { eq } from "drizzle-orm";

// interface dataProps {
//     id:number;
//     user_id:string;
//     product_id:string;
//     quantity :number;
// }


export const GET = async(request : NextRequest) =>{
    const req = request.nextUrl;
    const uid =  req.searchParams.get('user_id') as string
   try{
    const res  = await db.select().from(cartTable).where(eq(cartTable.user_id,uid))
    return NextResponse.json({ res })
   }catch(error){
        console.log('Something went wrong:',error)
   }

}

export const POST = async(request : NextRequest) =>{
    const req = await request.json();
    const uid = uuid();
    const setCookies = cookies();

    //This is to check for an existing user_id. if it doesn't exist set new user id.
    // if(!cookies().has('user_id')){
        
    // }
    
       const user_id = cookies().get('user_id')?.value as string;
       if(!user_id){
    
        setCookies.set('user_id',uid)
       }
       
    
    console.log(uid)
    
    try{
        const res = await db.insert(cartTable).values({
            product_id : req.product_id,
            quantity : req.quantity,
            // quantity:1,
            user_id :cookies().get('user_id')?.value as string
        }).returning();
        return NextResponse.json({res})
    }
    catch(error){

    }
 }