'use client'

export const accessToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("accessToken") || "";
    }
    return ""
}

export const sessionValue = () => {
    if (typeof window !== "undefined") {
        return sessionStorage.getItem("logItem") || "";
    }
    return ""
}