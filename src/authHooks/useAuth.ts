import { setCookie } from "@/utils/setCookies";
import { useState, useCallback } from "react"


export type AppEnv = 'LOCAL' | 'staging' | 'PRODUCTION';
export const APP_ENV = (process.env.NEXT_PUBLIC_APP_ENV as AppEnv) ?? 'PRODUCTION';
export const url =
  APP_ENV === 'LOCAL'
    ? process.env.NEXT_PUBLIC_LOCAL_API!
    : process.env.NEXT_PUBLIC_DEPLOYED_API!;

    
if (!url) {
  throw new Error('API_BASE_URL is not defined');
}


export default () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const logInUser = useCallback(async (formData: FormData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${url}/auth/login`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            const userInfo = await response.json();

            if (userInfo?.meta?.accessToken) {
                setCookie(userInfo.meta.accessToken)
            }

            return userInfo;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const signUpUser = useCallback(async (formData: FormData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${url}/auth/signup`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            const userInfo = await response.json();

            return userInfo;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const verifyUser = useCallback(async (data: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${url}/auth/verify`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const verificationResponse = await response.json();
            return verificationResponse;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const resetPassword = useCallback(async (data: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${url}/auth/reset`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const verificationResponse = await response.json();
            return verificationResponse;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { logInUser, signUpUser, verifyUser, resetPassword, loading, error };
};
