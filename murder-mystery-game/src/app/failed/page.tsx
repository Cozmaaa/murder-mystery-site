"use client";

import { useRouter } from "next/navigation";
import styles from "./PurchaseFailed.module.css";

const PurchaseFailed = () => {
  const router = useRouter();
  const handleRetryButton = () => {
    router.push("/checkout");
  };

  const handleHomeButton = () => {
    router.push("/home");
  };

  return (
    <div className={styles.container}>
      <div className="bg-white p-8 md:mx-auto shadow-lg rounded-xl max-w-lg">
        <svg
          viewBox="0 0 24 24"
          className="text-red-500 w-20 h-20 mx-auto my-6 animate-pulse"
        >
          <path
            fill="currentColor"
            d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.656 15.656a1 1 0 0 1-1.414 0L12 13.414l-4.242 4.242a1 1 0 0 1-1.414-1.414L10.586 12 6.344 7.758a1 1 0 1 1 1.414-1.414L12 10.586l4.242-4.242a1 1 0 1 1 1.414 1.414L13.414 12l4.242 4.242z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-3xl text-xl text-gray-900 font-bold">
            Payment Failed
          </h3>
          <p className="text-gray-600 my-4">
            Something went wrong with your payment. ❌
          </p>
          <p className="text-gray-500">Please try again or contact support.</p>
        </div>
        <div className="py-10 text-center space-x-4">
          <button
            onClick={handleHomeButton}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-400 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseFailed;
