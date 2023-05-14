import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Button, TextField } from '@mui/material';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import useCreate from '../hooks/useCreate';
import { CreateUserURL } from '../Endpoints';

function CreateAcct() {
    const navigate = useNavigate()
    // This variable determines whether password is shown or not
    const [isShown, setIsSHown] = useState(false);
    const [Shown, setSHown] = useState(false);
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [Password, setPassword] = useState("")
    const [CoPassword, setCoPassword] = useState("")
    const [isMatch, setIsMatch] = useState(true)
    const { createUser, data, isLoading, error } = useCreate()
    const matchstate = "Password must match";
    //This function dertermines when the checbox is either chacked or unchecked
    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
    };
    const checkPassword = () => {
        setSHown((Shown) => !Shown);
    }
    const formHeader = "Welcome to EverGreen CBT";

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Password !== CoPassword) {
            setIsMatch(false)
        } else {
            const formdata = new FormData()
            formdata.append('FirstName', FirstName)
            // formdata.FirstName = FirstName;
            formdata.append('LastName', LastName)
            // formdata.LastName = LastName;
            formdata.append('Email', Email)
            // formdata.Email = Email;
            formdata.append('PhoneNumber', PhoneNumber)
            // formdata.PhoneNumber = PhoneNumber;
            formdata.append('Password', Password)
            // formdata.Password = Password;
            // console.log(formdata);

            try {
                await createUser(CreateUserURL, formdata)
                console.log(data.FirstName);
                navigate('/login')
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <Stack className='CreateAcct'>
            {isLoading && <div>Loading ...</div>}
            <div className='regform'>
                <div className='formText'>
                    {formHeader}
                </div>
                {error && <div>{error}</div>}
                <form className='register' onSubmit={handleSubmit}>
                    <Stack direction='column' spacing={4}>
                        <Stack>
                            {/* <span className="aboveform">FirstName : </span><br></br> */}
                            <TextField type='text'
                                label='FirstName'
                                onChange={(e) => setFirstName(e.target.value)}
                                autoFocus required
                                className='forform'
                                name='FirstName'
                                variant='standard'
                                color='success'
                            />
                        </Stack>
                        <Stack>
                            {/* <span className="aboveform">LastName : </span> */}
                            <TextField
                                type='text'
                                label='LastName'
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className='forform'
                                name='LastName'
                                variant='standard'
                                color='success'
                            />
                        </Stack>
                        <Stack spacing={1} direction='column'>
                            {/* <span className="aboveform">Email</span> */}
                            <TextField
                                type='email'
                                label='Email'
                                onChange={(e) => setEmail(e.target.value)}
                                className='forform'
                                name='Email'
                                variant='standard'
                                color='success'
                            />
                        </Stack>
                        <Stack>
                            {/* <span className="aboveform">PhoneNumber : </span> */}
                            <TextField
                                type='tel'
                                label='PhoneNumber'
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                className='forform'
                                name='PhoneNumber'
                                variant='standard'
                                color='success'
                            />
                        </Stack>
                        <Stack>
                            {/* <span className="aboveform">PassWord : </span> */}
                            <TextField
                                type={isShown ? "text" : "password"}
                                label="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='forform'
                                name='PassWord'
                                variant='standard'
                                color='success'
                            />
                            <input
                                id="checkbox"
                                type="checkbox"
                                checked={isShown}
                                onChange={togglePassword}
                            />
                        </Stack>
                        <Stack>
                            {/* <span className="aboveform">ConFirm Password</span><br></br> */}
                            <TextField
                                type={Shown ? "text" : "password"}
                                label="Confirm Password"
                                onChange={(e) => setCoPassword(e.target.value)}
                                required
                                className='forform'
                                name='CoPassword'
                                variant='standard'
                                color='success'
                                helperText={!isMatch && <p> {matchstate} </p>}
                            />
                            {/* {!isMatch && <p> {matchstate} </p>} */}
                            <input
                                id="checkbx"
                                type="checkbox"
                                checked={Shown}
                                onChange={checkPassword}
                            />
                        </Stack>
                        <Stack>
                            <Button variant='contained' color='success' type='submit' startIcon={<ExitToAppRoundedIcon />} disabled={isLoading}> SignUp </Button>
                            <Stack>
                                <span>Already have an account?</span><br></br>
                                <Link to='/CreateAcct'>Login</Link>
                            </Stack>
                        </Stack>
                    </Stack>
                </form>
            </div>
        </Stack>
    )
}

export default CreateAcct
