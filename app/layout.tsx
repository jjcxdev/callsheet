import "@/app/globals.css";
import { Oswald, Inter } from "next/font/google";
import type React from "react"; // Import React

const oswald = Oswald({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Call Sheet Generator",
  description: "Generate call sheets for film and television productions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${oswald.className} ${inter.className} h-full`}>
        {children}
      </body>
    </html>
  );
}
