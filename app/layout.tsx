import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import AuthProvider from "../app/components/AuthProvider";
import { store } from "./redux/store";
import ReduxProvider from "./components/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "job Listing app",
  description: "Find the a job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <ReduxProvider>
          <body className={inter.className}>{children}</body>
        </ReduxProvider>
      </AuthProvider>
    </html>
  );
}
