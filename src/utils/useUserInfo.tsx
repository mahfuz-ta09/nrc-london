"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { accessToken } from "./accessToken";


export const useUserInfo = () => {
    const [user, setUser] = useState<{ Uemail: string; Urole: string; Uid: string ; Ustatus: string}>({
        Uemail: "",
        Urole: "",
        Uid: "",
        Ustatus: "",
    })

    const updateUser = () => {
        const token = accessToken();
        if (token) {
            try {
                const decoded: any = jwtDecode(token)
                setUser({
                    Uemail: decoded?.email || "",
                    Urole: decoded?.role || "",
                    Uid: decoded?.id || "",
                    Ustatus: decoded?.status || "",
                });
            } catch (error) {
                console.error("Invalid token:", error);
                setUser({ Uemail: "", Urole: "", Uid: "" , Ustatus: ""})
            }
        } else {
            setUser({ Uemail: "", Urole: "", Uid: "" , Ustatus: ""})
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
