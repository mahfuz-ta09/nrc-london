"use client"
import { useState, useEffect } from "react"


export const useUserInfo = () => {
    const [user, setUser] = useState<{ Uemail: string; Urole: string;}>({
        Uemail: "",
        Urole: ""
    })

    const updateUser = () => {
        const token = JSON.parse(localStorage.getItem('userData') || '{}')
        console.log(token)
        
        if (token) {
            try {
                setUser({
                    Uemail: token?.email || "",
                    Urole: token?.role || "",
                })
            } catch (error) {
                console.error("Invalid token:", error);
                setUser({ Uemail: "", Urole: ""})
            }
        } else {
            setUser({ Uemail: "", Urole: ""})
        }
    }

    // useEffect(() => {
    //     updateUser()
    //     window.addEventListener("tokenChanged", updateUser)
    //     return () => {
    //         window.removeEventListener("tokenChanged", updateUser)
    //     }
    // }, [])

    return user
}
