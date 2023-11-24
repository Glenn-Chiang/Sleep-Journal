import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import '../globals.css'
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AuthProvider } from '@/components/AuthProvider';
config.autoAddCss = false;


const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sleep Journal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
          <Navbar />
          <main className="flex min-h-screen flex-col items-center pt-20 p-4 gap-8 sm:gap-10">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
