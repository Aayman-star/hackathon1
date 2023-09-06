 import { NextRequest,NextResponse } from "next/server";
 import { db,cartTable } from "@/lib1/drizzle";


 import {v4 as uuid} from 'uuid'
 import { cookies } from "next/headers";
import { eq,and, asc } from "drizzle-orm";
import { cartActions } from "@/app/store/slice/cartSlice";


interface cartItem{
    product_id:string;
    product_name:string;
    quantity:number;
    price:number;
    total_price:number;
    image:string;
}


export const GET = async(request : NextRequest) =>{
    const req = request.nextUrl;
    const uid =  req.searchParams.get('user_id') as string
   try{
    const res: Array<cartItem>  = await db.select().from(cartTable).where(eq(cartTable.user_id,uid)).orderBy(asc(cartTable.id));
    const cartItems = res.map((item) => ({
        product_id:item.product_id,
        product_name:item.product_name,
        quantity:item.quantity,
        price:item.price,
        total_price:item.total_price,
        image:item.image

    }))
    const totalQuantity = cartItems.reduce((total,item) => total + item.quantity,0);
    const totalPrice = cartItems.reduce((total,item) => total + item.total_price,0);
    return NextResponse.json({ cartItems,totalQuantity,totalPrice },{status:200});

   }catch(error){
        console.log('Something went wrong:',error)
        return NextResponse.json({Message:error},{status:500})
   }

}

/**POST METHOD TO SUBMIT DATA TO THE DATABASE... */

export const POST = async(request : NextRequest) =>{
    const req = await request.json();
    const uid = uuid();
    const setCookies = cookies();

   
    
       const user_id = cookies().get('user_id')?.value as string;
       if(!user_id){
    
        setCookies.set('user_id',uid)
       }
       
    
    console.log(uid)
    
    try{
        const res = await db.insert(cartTable).values({
            product_id : req.product_id,
            quantity : req.quantity,
            user_id :cookies().get('user_id')?.value as string,
            price: req.price,
            total_price:req.total_price,
            product_name:req.product_name,
            image: req.image
        }).returning();
        return NextResponse.json({res},{status:200})
    }
    catch(error){
        console.log(error)
        return NextResponse.json({Message:error},{status:400})
    }
 }
/**METHOD TO UPDATE THE DATA IN THE DATABASE */

export const PUT = async(request:NextRequest) =>{
    
    const data = await request.json();
    const req = request.nextUrl;
    const productId =  req.searchParams.get('product_id') as string;
    const userId = req.searchParams.get('user_id') as string;

    try{
        if(data){
           const updatedData = await db.update(cartTable).set({
            quantity: data.quantity,
            total_price: data.total_price
           }).where(and(eq(cartTable.user_id, userId),eq(cartTable.product_id,productId))).returning();

           

           return NextResponse.json({updatedData},{status:200})
        }
        else{
            throw new Error(`Failed to update data`)
        }

    }catch(error){
        console.log(error)
        return NextResponse.json({Message:error},{status:400})

    }

}

/**METHOD TO DELETE DATA FROM THE DATABASE */

export const DELETE = async(request: NextRequest)=>
{
  const req = request.nextUrl;
  const productId =  req.searchParams.get('product_id') as string;
  const userId = req.searchParams.get('user_id') as string;
    
    try{
        if(productId && userId){
            console.log(`PRODUCT_ID: ${productId} & USER_ID : ${userId} from the api`)
            const res = await db.delete(cartTable).where(eq(cartTable.product_id,productId)).returning();

            return NextResponse.json({Message: `Data deleted successfully`},{status:200})
        }
        else{
            if('product_id'){
                throw new Error(`Login required to procees`)
            }
            else{
                throw new Error(`Product not found`)
            }

        }
    }
    catch(error){
        console.log(error)
        return NextResponse.json({Message:`Failed to remove data`},{status:405})

    }

}




  //This is to check for an existing user_id. if it doesn't exist set new user id.
    // if(!cookies().has('user_id')){
        
    // }

    // ,{ params: { productId,userId } }: { params: { productId: string ,userId:string} }