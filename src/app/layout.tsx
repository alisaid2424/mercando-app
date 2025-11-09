import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Index";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/providers/ReduxProvider";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Mercando",
  description:
    "Mercando is your modern online marketplace offering a seamless shopping experience with curated products, fast delivery, and excellent customer service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`}>
          <ReduxProvider>
            <Header />
            <Toaster />
            <main className="min-h-[calc(100vh-60px)]">{children}</main>
            <Footer />
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
