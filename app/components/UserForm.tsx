"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSignUpMutation } from "../redux/service/authApi";
import { signIn } from "next-auth/react";
import Verify from "./Verify";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export const UserForm = () => {
  const [signUp, { data, isLoading, isSuccess, isError, error }] =
    useSignUpMutation();
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [formData, setFormData] = useState<FormValues | null>(null);
  const router = useRouter(); // Initialize useRouter

  const onSubmit = async (data: FormValues) => {
    if (data.password !== data.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: "user",
      }).unwrap();
      setFormData(data);
    } catch (err) {
      console.error("Sign up failed:", err);
    }
  };

  const getErrorMessage = (error: unknown): string => {
    if (error && typeof error === "object") {
      if ("status" in error && "data" in error) {
        return (error as any).data?.message || "An unexpected error occurred.";
      }
      if ("message" in error) {
        return (error as any).message;
      }
    }
    return "An unexpected error occurred.";
  };

  // Redirect to "/" after successful Google sign-in
  const handleGoogleSignIn = async () => {
    const result = await signIn("google", { redirect: false });
    console.log("clicked and called google");

    if (result?.ok) {
      router.push("/"); // Use relative path for homepage redirection
      console.log("here is the signup push");
    } else {
      console.error("Google sign-in failed:", result?.error);
    }
  };

  if (isSuccess && data) {
    return <Verify email={formData?.email || ""} />;
  }

  return (
    <div className="flex flex-col items-center w-[550px] border text-center gap-5 bg-white py-10 my-10 mb-14">
      <h1 className="text-3xl font-black">Sign Up Today!</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form flex flex-col justify-center items-start w-2/3"
        noValidate
      >
        <div
          className="flex justify-center items-start gap-3 border py-2 px-1 w-full rounded-md cursor-pointer"
          onClick={handleGoogleSignIn} // Use the handler
        >
          <img
            src="/assets/IcongoogleIcon.svg"
            className="w-fit inline"
            alt=""
          />
          <span className="text-brand-color">Sign In With Google</span>
        </div>
        <div className="flex items-center justify-center my-4 w-full">
          <span className="flex-grow border-t border-gray-300 w-1/5"></span>
          <span className="mx-4 text-gray-500">Or Sign Up with Email</span>
          <span className="flex-grow border-t border-gray-300 w-1/5"></span>
        </div>

        <label htmlFor="name" className="label-f block mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          className="border py-2 px-1 w-full rounded-md mb-4"
          placeholder="Enter Your Full name"
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
          })}
        />
        <p className="error">{errors.name?.message}</p>

        <label htmlFor="email" className="label-f block mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter Your Email"
          className="border py-2 px-1 w-full rounded-md mb-4"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format",
            },
            required: {
              value: true,
              message: "Email is required",
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>

        <label htmlFor="password" className="label-f block mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter Your password"
          className="border py-2 px-1 w-full rounded-md mb-4"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        <p className="error">{errors.password?.message}</p>

        <label htmlFor="confirmPassword" className="label-f block mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Enter Your Password"
          className="border py-2 px-1 w-full rounded-md mb-4"
          {...register("confirmPassword", {
            validate: (value) =>
              value === form.getValues("password") || "Passwords do not match",
          })}
        />
        <p className="error">{errors.confirmPassword?.message}</p>

        <button
          type="submit"
          className="btn w-full rounded-full text-center py-2 my-3 mb-3 back-brand-color text-white"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Continue"}
        </button>

        <p className="w-full text-left font-extralight mb-4">
          Already have an account?{" "}
          <Link href="/auth/signIn">
            <span className="text-brand-color">Login</span>
          </Link>
        </p>

        <p className="w-full text-left font-extralight">
          By clicking 'Continue', you acknowledge that you have read and
          accepted our{" "}
          <Link href="">
            <span className="text-brand-color">Terms of Service</span>
          </Link>{" "}
          and{" "}
          <Link href="">
            <span className="text-brand-color">Privacy Policy</span>
          </Link>
          .
        </p>

        {isError && (
          <p className="error">Sign up failed: {getErrorMessage(error)}</p>
        )}
      </form>
    </div>
  );
};
