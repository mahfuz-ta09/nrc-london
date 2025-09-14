import { useState } from 'react'

export type AppEnv = 'LOCAL' | 'staging' | 'PRODUCTION';
export const APP_ENV = (process.env.NEXT_PUBLIC_APP_ENV as AppEnv) ?? 'PRODUCTION';
export const url =
    APP_ENV === 'LOCAL'
    ? process.env.NEXT_PUBLIC_LOCAL_API!
    : process.env.NEXT_PUBLIC_DEPLOYED_API!;

    
if (!url) {
  throw new Error('API_BASE_URL is not defined');
}


const useImageUpload = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    const uploadImage = async( formData: FormData ) => {
        setIsLoading(true)
        setError(null)
        
        try{
            const response = await fetch(`${url}/file/upload`, {
                method: "POST",
                credentials: "include",
                body: formData,
            })

            
            const result = await response.json()
            if(!response.ok){
                setError(result.message || "Failed to upload image")
                throw new Error(result.message || "Failed to upload image")
            }
            
            
            return result?.data
        }catch(err:any){
            setError(err.message)
            return null
        }finally{
            setIsLoading(false)
        }
    }

    return { uploadImage , isLoading, error }
}

export default useImageUpload
