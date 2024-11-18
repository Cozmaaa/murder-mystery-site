"use client";

import { useRouter } from "next/navigation";
import styles from "./PurchaseSuccessful.module.css";

const PurchaseSuccessful = () => {
  const router = useRouter();
  const handleButtonHome = () => {
    router.push("/home");
  };

  return (
    <div className={styles.container}>
      <div className="bg-white p-8 md:mx-auto shadow-lg rounded-xl max-w-lg">
        <svg
          viewBox="0 0 24 24"
          className="text-green-500 w-20 h-20 mx-auto my-6 animate-bounce"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-3xl text-xl text-gray-900 font-bold">
            Payment Successful!
          </h3>
          <p className="text-gray-600 my-4">
            Thank you for purchasing our product. 🎉
          </p>
          <p className="text-gray-500">We hope you enjoy it!</p>
        </div>
        <div className="py-10 text-center">
          <button
            onClick={handleButtonHome}
            className="px-12 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessful;
