import React from "react";

export default function MatchMakingtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-h-screen">
      <div className="bodyBgImg"></div>
      <div>{children}</div>
    </div>
  );
}
