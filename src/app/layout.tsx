import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/providers/ReduxProvider";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: {
    default: "Mercando — Modern Online Marketplace",
    template: "%s — Mercando",
  },
  description:
    "Mercando is your modern online marketplace offering a seamless shopping experience with curated products, fast delivery, and excellent customer service.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased text-gray-700`}>
        <ClerkProvider
          telemetry={{ disabled: true }}
          appearance={{
            variables: {
              colorPrimary: "#e85a0c",
            },
          }}
        >
          <ReduxProvider>
            <Toaster />
            {children}
          </ReduxProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
