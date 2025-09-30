import type { Metadata, Viewport } from "next"
import "./globals.css"
import Providers from "@/redux/Providers"
import { Nunito } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Bounce, ToastContainer } from "react-toastify"


config.autoAddCss = false

const kanit = Nunito({ subsets: ['latin'], weight: ['200','300','400', '500', '700','800','900'] })

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
      images: ["/icons/icon-512x512.png"],
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/icons/icon-192x192.png"
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
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-KQ36REED2T"></script>
            <script>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-KQ36REED2T');
              `}
            </script>
          </body>
        </Providers>
      </html>
  )
}
