import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bodyBgImg"></div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
