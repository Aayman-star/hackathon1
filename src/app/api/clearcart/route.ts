/**METHOD TO DELETE DATA FROM THE DATABASE */
import { NextRequest,NextResponse } from "next/server";
import { db,cartTable } from "@/lib1/drizzle";
import { eq } from "drizzle-orm";
export const DELETE = async(request: NextRequest)=>
{
  const req = request.nextUrl;
  //const productId =  req.searchParams.get('product_id') as string;
  const userId = req.searchParams.get('user_id') as string;
    
    try{
        if(userId){
            console.log(`USER_ID : ${userId} from the clear cart api`)
            const res = await db.delete(cartTable).where(eq(cartTable.user_id,userId)).returning();

            return NextResponse.json({Message: `Data deleted successfully`},{status:200})
        }
        else{
            // // if('product_id'){
            //     throw new Error(`Login required to procees`)
            // }
            // else{
            //     throw new Error(`Product not found`)
            // }
                    console.log(`USER ID MISSING`)
        }
    }
    catch(error){
        console.log(error)
        return NextResponse.json({Message:`Failed to remove data`},{status:405})

    }

}