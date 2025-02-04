'use client'

export const accessToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("accessToken") || "";
    }
    return ""; // Return empty string if on the server
};