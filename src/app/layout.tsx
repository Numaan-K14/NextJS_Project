"use client";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { queryClient } from "@/config/query-Client";
import { redirect, useRouter } from "next/navigation";
import { SideMenu } from "@/components/Custom/SIdeMenu";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [client] = useState(() => queryClient);
  const token = JSON.parse(localStorage.getItem("token") || "null");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/Landing");
    } else {
      redirect("/Login");
    }
  }, [router, token]);
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          {token && (
            <SideMenu sidemenuIcon1="Overview.png" sidemenuName1="Overview" />
          )}
          <main className="w-full bg-[#8E9FC11F]">
            <Toaster richColors position="bottom-center" />
            <QueryClientProvider client={client}>
              {children}
            </QueryClientProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
