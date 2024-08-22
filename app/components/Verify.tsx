import { useForm, Controller } from "react-hook-form";
import { useVerifyEmailMutation } from "../redux/service/authApi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface VerifyProps {
  email: string;
}

type FormValues = {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
};

const Verify: React.FC<VerifyProps> = ({ email }) => {
  const router = useRouter();
  const [verifyEmail, { data, isLoading, isSuccess, isError, error }] =
    useVerifyEmailMutation();
  const { control, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;

  const [timeLeft, setTimeLeft] = useState(30); // countdown starts from 30 seconds
  const [showModal, setShowModal] = useState(false);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const onSubmit = async (formValues: FormValues) => {
    const otp = `${formValues.otp1}${formValues.otp2}${formValues.otp3}${formValues.otp4}`;
    try {
      await verifyEmail({ email, OTP: otp }).unwrap();
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setShowModal(true); // Show the modal when verification is successful
    }
  }, [isSuccess]);

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/auth/signIn"); // Redirect to sign-in page after modal is dismissed
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.value.length === 1 && index < otpRefs.length - 1) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const getErrorMessage = (error: any): string => {
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

  return (
    <div className="flex flex-col items-center w-[550px] border text-center gap-5 bg-white py-10 my-10 mb-14">
      <h2 className="font-black mb-10 mt-10">Verify Your Email</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form flex flex-col justify-center items-center w-2/3"
        noValidate
      >
        <p className="text-left font-thin mb-20">
          We&apos;ve sent a verification code to the email address you provided.
          To complete the verification process, please enter the code here.
        </p>

        <div className="flex justify-center items-center space-x-3 mb-4">
          {[0, 1, 2, 3].map((index) => (
            <Controller
              key={index}
              control={control}
              name={`otp${index + 1}` as keyof FormValues} // Cast to a specific key
              render={({ field }) => (
                <input
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 border rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-brand-color"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e, index);
                  }}
                  ref={otpRefs[index]}
                />
              )}
            />
          ))}
        </div>

        <p className="text-red-500 text-sm mt-1">
          {errors.otp1?.message ||
            errors.otp2?.message ||
            errors.otp3?.message ||
            errors.otp4?.message}
        </p>

        <p className="mb-10">
          You can request to{" "}
          <Link href="">
            <span
              className={`text-brand-color ${
                timeLeft === 0 ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              Resend code
            </span>
          </Link>{" "}
          in{" "}
          {timeLeft === 0
            ? "now"
            : `0:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}{" "}
        </p>

        <button
          type="submit"
          className="back-brand-color text-white w-full rounded-full text-center py-2 my-3 mb-20"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Continue"}
        </button>

        {isError && (
          <p className="error">Verification failed: {getErrorMessage(error)}</p>
        )}
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Successfully Verified!</h2>
            <p>Your email has been verified successfully.</p>
            <button
              onClick={handleModalClose}
              className="back-brand-color text-white w-full rounded-full text-center py-2 mt-6"
            >
              Continue to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;
