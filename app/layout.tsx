'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import store from "@/redux/store";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className + " bg-black/5 p-10"}>{children}</body>
      </html>
    </Provider>

  );
}
