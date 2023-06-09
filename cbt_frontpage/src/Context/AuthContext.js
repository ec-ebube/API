import { createContext, useReducer, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }

        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {

    // const navigate = useNavigate()
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // console.log("AuthContext state", state);

    useEffect(() => {
        const user = localStorage.getItem('user');

        // var theUser = JSON.parse(user);

        if (user) {
            
                dispatch({ type: 'LOGIN', payload: user })
               
        }


    }, [])


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}