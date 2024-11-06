"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./SignUp.module.css";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/user/signup",
        { username, email, password },
        { withCredentials: true }
      );
      router.push("/home");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Join the Investigation</h1>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className={styles.input}
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={styles.input}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Register
        </button>
        <p className={styles.text}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
