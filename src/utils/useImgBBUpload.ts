const apiKey = "70658ec884a671dba00f64777f0d9ae1"
const url = `https://api.imgbb.com/1/upload?key=${apiKey}`
import { useState } from "react";

const useImgBBUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (image:FileList) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", image[0]);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message || "Failed to upload image")
      }

      
      return result.data.url
    } catch (error:any) {
      setError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadImage, isLoading, error }
};

export default useImgBBUpload
