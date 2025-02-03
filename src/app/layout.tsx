import type { Metadata } from "next"
import "./globals.css"
import { Ysabeau_SC } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Providers from "@/redux/Providers"
import { ToastContainer } from "react-toastify"
config.autoAddCss = false

const ysabeau = Ysabeau_SC({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: "nrc-london",
  description: "Your future destination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={ysabeau.className}>
          {children}
          <ToastContainer />
        </body>
      </Providers>
    </html>
  );
}
