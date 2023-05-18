import { useState } from 'react'

function useCreate() {
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const createUser = async (url, formdata) => {
        setError(false)
        setIsLoading(true)
        console.log(formdata);

        const res = await fetch(url, {
            method: 'POST',
            body: formdata,
        })
        try {
            
            if (!res.ok) {
                setIsLoading(false)
                if (res.status === 401) {
                    throw Error('Unauthorized')
                }else if (res.status === 403)
                {
                    throw Error('Forbiden')
                }else{
                    throw Error('server error')
                }
            }
            const response =  res
            console.log(response);
            setIsLoading(false)
            setError(null)
            setData(response)
        } catch (error) {
            setError(error.message)
        }
    }
  return { createUser, data, isLoading, error}
}

export default useCreate