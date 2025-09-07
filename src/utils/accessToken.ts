'use client'

export const accessToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("nrc_acc") || "";
    }
    return ""
}


export const sessionValue = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("logItem")
    }
    return null
}