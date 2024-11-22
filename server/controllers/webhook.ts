import Stripe from "stripe";
import { Request, Response } from "express";
import UserModel from "../models/userModel";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const handleWebhook = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    // Verify that the request is coming from Stripe
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret!);
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed.`, err);
    res.status(400).send(`Webhook Error: ${err}`);
    return;
  }

  // Handle the event type
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      // Fetch related data from session
      const products = session.metadata?.products ? JSON.parse(session.metadata.products) : undefined;
      const token = session.metadata?.token;

      // Perform database update here
      if (products && products.length > 0) {
        const levels = products.map((product:any) => product.level);
        console.log(levels);
        if(!token){
            console.log("❌ No token found in session metadata");
            res.status(400).send("No token found in session metadata");
            return;
        }
        const decoded:any = jwt.verify(token , process.env.JWT_SECRET as string);
        

        await UserModel.findByIdAndUpdate(
          decoded.id,
          { $addToSet: { accesibleCases: { $each: levels } } },
          { new: true }
        );
      }

        

      console.log("✅ Payment successful, database updated");
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
};
