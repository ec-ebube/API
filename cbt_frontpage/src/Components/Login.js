import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Stack,
    Button,
    /*InputAdornment,*/
    TextField,
    useMediaQuery,
    useTheme,
    FormControl
} from '@mui/material';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import SpaIcon from '@mui/icons-material/Spa';
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

    const theme = useTheme();
    // console.log(theme);
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    // console.log(isMatch);


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

            console.log(data);
            navigate('/')
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <Stack className="Login">
            {isLoading && <div>Loading ...</div>}
            {!isMatch ? <Stack className='loginform'>
                {error && <div>{error}</div>}

                <Stack className="formText">
                    {formHeader}
                </Stack>
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
                                sx={{
                                    maxWidth: '20vw'
                                }}
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
                                sx={{
                                    maxWidth: '20vw'
                                }}
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
                :
                <Stack direction='column' spacing={5} className='Login2' sx={{
                    minWidth: '100%'
                }}>
                    {error && <div>{Error}</div>}
                    {isLoading && <div>Loading ...</div>}
                    <Stack>
                        <SpaIcon />
                    </Stack>
                    <FormControl onSubmit={handleLogin} sx={{
                        minWidth: '90%'
                    }}>
                        <TextField type='email'
                            label='Email'
                            variant='standard'
                            autoFocus
                            required
                            color='success'
                            name='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                minWidth: '100%',
                                marginBottom: '5vh'
                            }}
                        />
                        <TextField
                            type={isShown ? "text" : "password"}
                            label='Password'
                            required
                            variant='standard'
                            color='success'
                            name='PassWord'
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                minWidth: '100%',
                                marginBottom: '5vh'
                            }}
                        />
                        <Stack spacing={5} direction='column'>
                            <Button variant='contained' color='success' type='submit' startIcon={<LoginRoundedIcon />} disabled={isLoading}> Login </Button>
                            <Stack>
                                <span>Don't have an account?</span><br></br>
                                <Link to='/CreateAcct'>Create Account</Link>
                            </Stack>
                        </Stack>
                    </FormControl>
                </Stack>}
        </Stack>
    )
}

export default Login
