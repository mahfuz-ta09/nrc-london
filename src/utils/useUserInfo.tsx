"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { accessToken } from "./accessToken";

export const useUserInfo = () => {
    const [user, setUser] = useState<{ Uemail: string; Urole: string; Uid: string }>({
        Uemail: "",
        Urole: "",
        Uid: "",
    })

    const updateUser = () => {
        const token = accessToken();
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setUser({
                    Uemail: decoded?.email || "",
                    Urole: decoded?.role || "",
                    Uid: decoded?.id || "",
                });
            } catch (error) {
                console.error("Invalid token:", error);
                setUser({ Uemail: "", Urole: "", Uid: "" })
            }
        } else {
            setUser({ Uemail: "", Urole: "", Uid: "" })
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
