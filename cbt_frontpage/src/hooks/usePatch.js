import { useState } from 'react'

function usePatch(url) {
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const updateUser = async (url, formdata) => {
        setError(false)
        setIsLoading(true)
        console.log(formdata);

        const res = await fetch(url, {
            method: 'PATCH',
            body: formdata,
            // headers: { Authorization: 'Bearer ' +token}
        })
        try {
            
            if (!res.ok) {
                setIsLoading(false)
                if (res.status === 401) {
                    throw Error('Unauthorized')
                }else if (res.status === 403)
                {
                    throw Error('Forbiden')
                }else if(res.status === 400){
                    console.log('responce not okay')
                    throw Error('Bad Request')
                }else{
                    throw Error('server error')
                }
            }
            const response =  res
            console.log(response);
            setIsLoading(false)
            setError(null)
            setData(response)
            window.location.reload()
        } catch (error) {
            setError(error.message)
        }
    }
  return { updateUser, data, isLoading, error}
}

export default usePatch