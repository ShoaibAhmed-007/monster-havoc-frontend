import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import React from "react";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-h-screen">
      <div className="bodyBgImg"></div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
