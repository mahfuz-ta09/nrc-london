'use client'

export const accessToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("accessToken") || "";
    }
    return ""
}


export const sessionValue = () => {
    if (typeof window !== "undefined") {
        const storedValue = sessionStorage.getItem("logItem")
        return storedValue ? storedValue : null
    }
    return null
}