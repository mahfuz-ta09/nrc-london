"use client"
import { useEffect, useState } from "react"
import { isProtectedRoute } from "@/utils/routes"
import { getNewAccessToken } from "./removeCookie"
import { useRouter, usePathname } from "next/navigation"

export const useTokenRefresh = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [loading, setLoading] = useState(true)

    const tryRefresh = async () => {
        try {
            await getNewAccessToken()
        } catch (err) {
            console.log("Token refresh failed:", err)
            if (isProtectedRoute(pathname)) {
                router.push("/Login")
            }
        } finally {
            setLoading(false)
        }
    }

    
    useEffect(() => {
        tryRefresh()
    }, [])

    
    useEffect(() => {
        if (isProtectedRoute(pathname)) {
            setLoading(true)
            tryRefresh()
        }
    }, [pathname])

    
    useEffect(() => {
        const handleVisibilityChange = async () => {
            if (document.visibilityState === "visible") {
                setLoading(true)
                await tryRefresh()
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
    }, [])

    return { loading }
}
