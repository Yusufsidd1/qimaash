import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Cart from "@/components/Cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qimaash - Islamic T-Shirts",
  description: "E-commerce store for the Islamic t-shirt brand Qimaash.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <Cart />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
