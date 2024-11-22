import Stripe from "stripe";
import { Request, Response } from "express";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key is not set");
}

const getDomain = (req: Request): string => {
  const origin = req.headers.origin || `http://${req.headers.host}`;
  return origin;
};


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createCheckoutSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { products } = req.body;
    const token = req.cookies.token;

    const lineItems = products.map((product: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.imageUrl]
        },
        unit_amount: Math.round(1 * 100), 
      },
      quantity: 1,
    }));

    console.log(lineItems[0].price_data.product_data.images);
    products.map((product:any)=>product.description="");

    const YOUR_DOMAIN = getDomain(req);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/failed`,
      metadata:{products:JSON.stringify(products),token},
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({
      message: "Server error during creating a checkout session",
    });
  }
};


