

export const logInUser = async(formData: FormData)=>{
    const response = await fetch('',{
        method: 'POST',
        body: formData,
        credentials: 'include'
    })

    const userInfo = await response.json()
    return userInfo
}


export const signUpUser = async(formData: FormData)=>{
    const response = await fetch('',{
        method: 'POST',
        body: formData,
        credentials: 'include'
    })

    const userInfo = await response.json()
    return userInfo
}