import {useAuthContext} from './useAuthContext'

export const useLogout = () => {

    const Logout = () => {
        const {dispatch} = useAuthContext();
        //Remove user from storage
        localStorage.removeItem('user')

        //Dispatch logout function
        dispatch({type: 'LOGOUT'})

    }
    return {Logout}

}