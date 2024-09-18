import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
// import { getCookie } from "cookies-next";

const key = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(key, {
  apiVersion: "2023-08-16",
});

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  try {
    if (body.length > 0) {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          {
            shipping_rate: "shr_1NpzU1Im7bh8CPHFjNgx1T1v",
          },
          { shipping_rate: "shr_1NpzWsIm7bh8CPHFAuHpcfzj" },
        ],
        invoice_creation: {
          enabled: true,
        },
        line_items: body.map((item: any) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.product_name,
              },
              unit_amount: item.price * 100,
            },

            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
            quantity: item.quantity,
          };
        }),

        //customer:customer.id,
        success_url: `${request.headers.get("origin")}/success`,
        //success_url : `${request.headers.get('origin')}/api/clearcart?user_id=${userId}`,
        cancel_url: `${request.headers.get("origin")}/Cart`,
      });

      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ Message: `something is wrong` });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error.message);
  }
};
//images:[item.image],
