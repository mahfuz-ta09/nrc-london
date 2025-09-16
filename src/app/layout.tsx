import type { Metadata, Viewport } from "next"
import "./globals.css"
import Providers from "@/redux/Providers"
import {  Kanit ,Roboto_Condensed } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Bounce, ToastContainer } from "react-toastify"


config.autoAddCss = false

const kanit = Roboto_Condensed({ subsets: ['latin'], weight: ['300','400', '500', '700','800','900'] })

export const metadata: Metadata = {
    title: {
      default: "nrcedu-uk",
      template: "%s | nrcedu-uk",
    },
    description: "Your future destination",
    twitter: {
      card: "summary_large_image",
      title: "nrcedu-uk",
      description: "Your future destination",
      images: ["/nrc.logo.png"],
    },
    icons: {
      icon: "/nrc.logo.png",
    },
    manifest: "/site.webmanifest",
    metadataBase: new URL("https://nrcedu-uk.com"),
};

export const viewport: Viewport = {
  themeColor: "#000000",
}
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
  )
}
