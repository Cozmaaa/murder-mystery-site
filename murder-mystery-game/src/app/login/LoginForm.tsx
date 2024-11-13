// app/login/LoginForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./Login.module.css";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
        { username, password },
        { withCredentials: true }
      );
      router.push("/home");
    } catch (error: any) {
      console.error(error);
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Unravel the Mystery</h1>
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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
        <p className={styles.text}>
          Don't have an account?{" "}
          <Link href="/register" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
