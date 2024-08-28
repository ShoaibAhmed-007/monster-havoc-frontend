import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="bodyBgImg"></div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
