import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "../globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sleep Journal - Login",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="bg-slate-200 w-screen h-screen justify-center items-center flex p-4 ">
          {children}
        </div>
      </body>
    </html>
  );
}
