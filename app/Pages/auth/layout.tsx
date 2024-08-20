import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="bodyBgImg"></div>

      <div>{children}</div>
    </div>
  );
}