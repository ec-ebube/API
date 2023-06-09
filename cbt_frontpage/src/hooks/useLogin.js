import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function useLogin() {
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const loginUser = async (url, formdata) => {
        setError(false)
        setIsLoading(true)
        // console.log(formdata);

        const res = await fetch(url, {
            method: 'POST',
            body: formdata,
        })

        try {
            if (!res.ok) {
                setIsLoading(false)
                if (res.status === 401) {
                    throw Error('Unauthorized')
                } else if (res.status === 403) {
                    throw Error('Forbiden')
                } else {
                    throw Error('server error')
                }
            }

            const response = await res.json()
            setIsLoading(false)
            setError(null)
            setData(response)
            const Recponce = response;
            localStorage.setItem('user', JSON.stringify(Recponce))
            console.log(Recponce);
            if (Recponce.Role === 'Admin') {
                navigate('/admin')
                window.location.reload()
            } else {
                navigate('/')
                window.location.reload()
            }
        } catch (error) {
            setIsLoading(false)
            setError(error.message)
        }
    }

    return { loginUser, error, data, isLoading }
}

export default useLogin
