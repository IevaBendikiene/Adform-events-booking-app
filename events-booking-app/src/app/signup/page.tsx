"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`Signup failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Signup success", data);
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button onClick={onSignup} className="btn mb-4">
        {buttonDisabled ? "No signup" : "Signup"}
      </button>
      <Link href="/login">Visit login</Link>
    </div>
  );
}
