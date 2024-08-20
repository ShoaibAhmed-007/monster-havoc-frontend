"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAlert } from "@/app/context/AlertContext";
import Link from "next/link";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type userDataype = {
  email: string;
  name: string;
  password: string;
};

const createUser = async (userData: userDataype) => {
  const response = await fetch(`${baseURL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

const userSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email format").required("Email is required"),
  password: string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one special character"
    )
    .required("Password is required"),
});

function Signup() {
  const mutation = useMutation({
    mutationFn: createUser,
  });

  const router = useRouter();

  const { showAlert } = useAlert();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values, {
        onSuccess: () => {
          setSubmitting(false);
          formik.resetForm();
          showAlert("User created successfully, Please login!", "success");
          router.push("/Pages/auth/login");
        },
        onError: () => {
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-16">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img className="py-2" src="/images/logo.png" alt="Logo" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create an account
          </h2>
          <p className="mt-2 text-center text-base text-[#e4cfcf]">
            Already have an account?{" "}
            <Link
              href="/Pages/auth/login"
              title=""
              className="font-medium transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form className="mt-8" onSubmit={formik.handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    className={`flex h-10 w-full rounded-md border ${
                      formik.errors.name && formik.touched.name
                        ? "border-red-500"
                        : "border-[#e4cfcf]"
                    } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
                      formik.errors.name && formik.touched.name
                        ? "focus:ring-red-500"
                        : "focus:ring-gray-400"
                    } focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-base font-medium">
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    className={`flex h-10 w-full rounded-md border ${
                      formik.errors.email && formik.touched.email
                        ? "border-red-500"
                        : "border-[#e4cfcf]"
                    } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
                      formik.errors.email && formik.touched.email
                        ? "focus:ring-red-500"
                        : "focus:ring-gray-400"
                    } focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    type="email"
                    placeholder="Email"
                    id="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className={`flex h-10 w-full rounded-md border ${
                      formik.errors.password && formik.touched.password
                        ? "border-red-500"
                        : "border-[#e4cfcf]"
                    } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
                      formik.errors.password && formik.touched.password
                        ? "focus:ring-red-500"
                        : "focus:ring-gray-400"
                    } focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 disabled:opacity-50"
                >
                  {formik.isSubmitting ? (
                    <svg
                      className="mr-2 h-4 w-4 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      Create Account <ArrowRight className="ml-2" size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-[#e4cfcf] bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <span className="mr-2 inline-block">
                <svg
                  className="h-6 w-6 text-rose-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.451 3.289 1.187l2.819-2.775C16.51 3.5 14.449 2.622 12.241 2.622A9.378 9.378 0 0 0 2.86 12a9.378 9.378 0 0 0 9.38 9.378c5.223 0 9.62-3.902 9.62-9.378 0-.662-.071-1.315-.215-1.944z" />
                </svg>
              </span>
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
