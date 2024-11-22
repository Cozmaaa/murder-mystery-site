// pages/buy/cases/level/[level].js
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Cinzel } from "next/font/google";
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400"] });

const CasePurchasePage = () => {
  const [caseData, setCaseData] = useState<any>(null);
  const params = useParams();
  const { level } = params;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/case/getCase`,
          { level },
          {
            withCredentials: true,
          }
        );
        setCaseData(response.data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage();
  }, [level]);


  const handleBuyCaseButtonClick=async()=>{
    const stripe = await loadStripe("pk_test_51QLVppKFUBBjfv5FH86sxecm5oCQCZ05UnOmhhY5Fa7qbvsBJ7GkdjkppbSpEDhrZJAB8dpa11v3bJ97lUYSBrLM00NuRB1Zan");

    const body={
      products:[caseData]
    }

    const headers ={
      "Content-Type":"application/json"
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout/create-checkout-session`,{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body),
      credentials:"include"
    })

    const session = await response.json();
    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.error("Error redirecting to checkout:", result.error);
    }
  };

  return (
    <div className={`${styles.container} ${cinzel.className}`}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Case Level {level}</h1>
          <p className={styles.paragraph}>Are you ready to dive into the mystery?</p>
          {caseData ? (
            <>
              <img
                src={caseData.imageUrl}
                alt="Mysterious Clue"
                width={600}
                height={400}
                className={styles.image}
              />
              <p className={styles.paragraph}>{caseData.description}</p>
            </>
          ) : (
            <p>Loading image...</p>
          )}
          <button className={styles.buyButton} onClick={handleBuyCaseButtonClick}>Buy Case</button>
        </div>
      </div>
    </div>
  );
};

export default CasePurchasePage;
