"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // Sending the user data in JSON format
      });

      if (response.ok) {
        const data = await response.json(); // Parse the response JSON
        console.log("Login success", data);
        toast.success("Login success");
        router.push("/profile");
      } else {
        // Handle non-200 responses
        const errorData = await response.json(); // Parse error message if any
        throw new Error(errorData.message || "Login failed");
      }
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />

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
      <button onClick={onLogin} className="btn mb-4">
        Login
      </button>
      <Link href="/signup">Visit sign up</Link>
    </div>
  );
}
