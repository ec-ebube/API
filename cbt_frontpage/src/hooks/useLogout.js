import {useAuthContext} from './useAuthContext'
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const logout = () => {

        //Remove user from storage
        // console.log(localStorage.getItem('user'));
        localStorage.removeItem('user')

        //Dispatch logout function
        dispatch({type: 'LOGOUT'})
        navigate('/login')

    }
    return {logout}

}