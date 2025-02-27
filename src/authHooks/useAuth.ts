import { useState, useCallback } from "react"
import { setCookie } from "@/utils/setCookies"

let API_URL = ''

API_URL = "https://nrc-server-production-19f8.up.railway.app/app/v1/auth"
API_URL = "http://localhost:7373/app/v1/auth"

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const logInUser = useCallback(async (formData: FormData) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_URL}/login`, {
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

            return userInfo
        } catch (err: any) {
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }, [])

    const verifyUser = useCallback(async (data:any) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`${API_URL}/verify`, {
                method: "POST",
                headers:{
                    'content-type':'application/json',
                },
                credentials: "include",
                body: JSON.stringify(data),
            })

            const verificationResponse = await response.json()
            return verificationResponse
        } catch (err: any) {
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }, [])

    const resetPassword = useCallback(async (data:any) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`${API_URL}/reset`, {
                method: "POST",
                credentials: "include",
                headers:{
                    'content-type':'application/json',
                },
                body: JSON.stringify(data),
            })

            const verificationResponse = await response.json()
            return verificationResponse
        } catch (err: any) {
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }, [])

    return { logInUser, signUpUser, verifyUser, resetPassword , loading, error }
}
