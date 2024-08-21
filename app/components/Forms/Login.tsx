"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { object, string } from "yup";
import { useFormik } from "formik";

type userLoginType = {
  email: string;
  password: string;
};

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const loginUser = async (userLogin: userLoginType) => {
  const response = await fetch(`${baseURL}/api/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLogin),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

const userLoginSchema = object({
  email: string().email("Invalid email format").required("Email is required"),
  password: string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one special character"
    )
    .required("Password is required"),
});

function Login() {
  const mutation = useMutation({
    mutationFn: loginUser,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values, {
        onSuccess: (response) => {
          setSubmitting(false);
          formik.resetForm();
          console.log(response, "Response");
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
            <img className="py-2" src="/images/logo.png" alt="" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight ">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-[#e4cfcf] ">
            Don&apos;t have an account?{" "}
            <Link
              href="/Pages/auth/signup"
              title=""
              className="font-semibold text-[#e4cfcf] transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>

          <form className="mt-8" onSubmit={formik.handleSubmit}>
            <div className="space-y-5">
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
                      Get Started <ArrowRight className="ml-2" size={16} />
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
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </span>
              Sign in with Google
            </button>
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-[#e4cfcf] bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <span className="mr-2 inline-block">
                <svg
                  className="h-6 w-6 text-[#2563EB]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                </svg>
              </span>
              Sign in with Facebook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
