"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null); // Reset error before the request

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setIsLoading(false);

    if (result?.ok) {
      router.push("/");
    } else {
      // Set the error state to display an error message
      console.log(result);
      setError(result?.error || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex justify-end bg-white">
      <div className="flex flex-col items-center w-[700px] text-center gap-5 bg-white p-20 m-10 mb-14">
        <h1 className="text-3xl font-black">Welcome Back,</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form flex flex-col justify-center items-start w-2/3"
          noValidate
        >
          <label htmlFor="email" className="label-f block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            className="border py-2 px-1 w-full mb-4 rounded-lg"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <label htmlFor="password" className="label-f block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            className="border py-2 px-1 w-full rounded-lg mb-4"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
          {error && <p className="error text-red-500">{error}</p>}{" "}
          {/* Display error message */}
          <button
            type="submit"
            className="back-brand-color text-white w-full rounded-full text-center py-2 my-3 mb-3"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
          <p className="w-full text-left font-extralight mb-4">
            Don't have an account?{" "}
            <Link href="/auth/signup">
              <span className="text-brand-color">Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
