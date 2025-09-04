"use client"
import { useState, useEffect } from "react"


export const useUserInfo = () => {
    const [user, setUser] = useState<{ Uemail: string; Urole: string; Uid: string ; Ustatus: string}>({
        Uemail: "",
        Urole: "",
        Uid: "",
        Ustatus: "",
    })
    const updateUser = () => {
    const stored = localStorage.getItem("nrc_acc")

    if (stored) {
        try {
            const token = JSON.parse(stored)
            setUser({
                Uemail: token?.user?.email || "",
                Urole: token?.user?.role || "",
                Uid: token?.user?.id || "",
                Ustatus: token?.user?.status || "",
            })
        } catch (error) {
            console.error("Invalid token:", error)
            setUser({ Uemail: "", Urole: "", Uid: "", Ustatus: "" })
        }
        } else {
            setUser({ Uemail: "", Urole: "", Uid: "", Ustatus: "" })
        }
    }

    
    useEffect(() => {
        updateUser()
        window.addEventListener("tokenChanged", updateUser)
        return () => {
            window.removeEventListener("tokenChanged", updateUser)
        }
    }, [])

    return user
}