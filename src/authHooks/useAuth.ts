import { useState, useCallback } from "react"
import { setCookie } from "@/utils/setCookies"

// const API_URL = "https://nrc-server.onrender.com/app/v1/auth"
const API_URL = "https://nrc-server-production.up.railway.app/app/v1/auth"

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const logInUser = useCallback(async (formData: FormData) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            const userInfo = await response.json();

            if (!response.ok) {
                throw new Error(userInfo?.message || "Login failed");
            }

            if (userInfo?.meta?.accessToken) {
                setCookie(userInfo.meta.accessToken)
            }

            return userInfo
        } catch (err: any) {
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }, [])

    const signUpUser = useCallback(async (formData: FormData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            const userInfo = await response.json()

            if (!response.ok) {
                throw new Error(userInfo?.message || "Signup failed")
            }

            if (userInfo?.meta?.accessToken) {
                setCookie(userInfo.meta.accessToken)
            }

            return userInfo
        } catch (err: any) {
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }, [])

    const cookieRemove = useCallback(async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(`${API_URL}/logout`, {
                    method: "GET",
                    credentials: "include",
                })

                const result = await response.json()

                if (!response.ok) {
                    throw new Error(result?.message || "Logout failed")
                }

                return result
            } catch (err: any) {
                setError(err.message)
                return null
            } finally {
                setLoading(false)
            }
    }, [])

    return { logInUser, signUpUser, cookieRemove, loading, error }
}
