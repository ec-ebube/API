import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stack, Button, /*InputAdornment,*/ TextField } from '@mui/material';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import useLogin from '../hooks/useLogin';
import { loginUserURL } from '../Endpoints';

function Login() {
    // This variable determines whether password is shown or not
    const [isShown, setIsSHown] = useState(false);

    //This function dertermines when the checbox is either checked or unchecked
    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
    };
    const navigate = useNavigate()
    const formHeader = "Welcome to EverGreen CBT";

    
    //For the error, the data and the isLoading Message;
    const [Password, setPassword] = useState("")
    const [Email, setEmail] = useState("")
    const { loginUser, error, data, isLoading } = useLogin();
    const handleLogin = async (e) => {
        e.preventDefault()

        const formdata = new FormData()
        formdata.append('Email', Email)
        formdata.append('PassWord', Password)
        try {
            await loginUser(loginUserURL, formdata)
            if (data) {
                console.log(data);
                navigate('/')
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <Stack className="Login">
            {isLoading && <div>Loading ...</div>}
            <Stack className='loginform'>
                <Stack className="formText">
                    {formHeader}
                </Stack>
                {error && <div>{error}</div>}
                <form className='signin' onSubmit={handleLogin}>
                    <Stack direction='column' spacing={5}>
                        <Stack spacing={1} direction='column'>
                            <span className="aboveform">Email</span>
                            <TextField type='email'
                                label='Email'
                                variant='standard'
                                autoFocus
                                className='forform'
                                color='success'
                                name='Email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Stack>
                        <Stack spacing={1} direction='column'>
                            <span className="aboveform">Password</span>
                            <TextField
                                type={isShown ? "text" : "password"}
                                label='Password'
                                className='forform'
                                required
                                variant='standard'
                                color='success'
                                name='PassWord'
                                onChange={(e) => setPassword(e.target.value)}
                                // inputProps={{
                                //     startAdornment: <InputAdornment position='end' id="checkbox"
                                //         type="checkbox"
                                //         checked={isShown}
                                //         onChange={togglePassword}
                                //         endIcon={<LoginRoundedIcon />}
                                //     />
                                // }}
                            />
                            <input
                                id="checkbox"
                                type="checkbox"
                                checked={isShown}
                                onChange={togglePassword}
                            />
                        </Stack>
                        <Stack spacing={5} direction='column'>
                            <Button variant='contained' color='success' type='submit' startIcon={<LoginRoundedIcon />} disabled={isLoading}> Login </Button>
                            <Stack>
                                <span>Don't have an account?</span><br></br>
                                <Link to='/CreateAcct'>Create Account</Link>
                            </Stack>
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    )
}

export default Login
