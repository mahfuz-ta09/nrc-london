import type { Metadata } from "next"
import "./globals.css"
import {  Kanit ,Roboto_Condensed } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Providers from "@/redux/Providers"
import { Bounce, ToastContainer } from "react-toastify"
config.autoAddCss = false

const kanit = Roboto_Condensed({ subsets: ['latin'], weight: ['400', '500', '700','800','900'] })

export const metadata: Metadata = {
  title: "nrcedu-uk",
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
        <body className={kanit.className}>
          {children}
          <ToastContainer
              style={{"zIndex":"999999"}}
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
          />
        </body>
      </Providers>
    </html>
  );
}
