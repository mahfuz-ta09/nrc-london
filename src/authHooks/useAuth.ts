import { useState, useCallback } from "react"
import { setCookie } from "@/utils/setCookies"

const API_URL = "https://unique-vision-production.up.railway.app/app/v1/auth"
// const API_URL = "http://localhost:7373/app/v1/auth"

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
            })

            const userInfo = await response.json();
            
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

    

    return { logInUser, signUpUser, loading, error }
}
