import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Stack, Button } from '@mui/material';

function CreateAcct() {
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
    //This function dertermines when the checbox is either chacked or unchecked
    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
    };
    const checkPassword = () => {
        setSHown((Shown) => !Shown);
    }
    const formHeader = "Welcome to EverGreen CBT";

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Password !== CoPassword) {
            setIsMatch(false)
        }else{
            const formdata = new FormData()
            formdata.append('FirstName', FirstName)
            formdata.append('LastName', LastName)
            formdata.append('Email', Email)
            formdata.append('PhoneNumber', PhoneNumber)
            formdata.append('Password', Password)
        }
        console.log(FirstName, LastName, Email, PhoneNumber, Password, CoPassword);
    }

    return (
        <Stack className='CreateAcct'>
            <div className='regform'>
                <div className='formText'>
                    {formHeader}
                </div>
                <form className='register' onSubmit={handleSubmit}>
                    <Stack>
                        <span className="aboveform">FirstName : </span><br></br>
                        <input type='text' placeholder='FirstName' onChange={(e) => setFirstName(e.target.value)} autoFocus required className='forform' name='FirstName' />
                    </Stack>
                    <Stack>
                        <span className="aboveform">LastName : </span>
                        <input type='text' placeholder='LastName' onChange={(e) => setLastName(e.target.value)} required className='forform' name='LastName' />
                    </Stack>
                    <Stack spacing={1} direction='column'>
                        <span className="aboveform">Email</span>
                        <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='forform' name='Email' />
                    </Stack>
                    <Stack>
                        <span className="aboveform">PhoneNumber : </span>
                        <input type='tel' placeholder='PhoneNumber' onChange={(e) => setPhoneNumber(e.target.value)} required className='forform' name='PhoneNumber' />
                    </Stack>
                    <Stack>
                        <span className="aboveform">PassWord : </span>
                        <input
                            type={isShown ? "text" : "password"}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='forform'
                            name='PassWord'
                        />
                        <input
                            id="checkbox"
                            type="checkbox"
                            checked={isShown}
                            onChange={togglePassword}
                        />
                    </Stack>
                    <Stack>
                        <span className="aboveform">ConFirm Password</span><br></br>
                        <input
                            type={Shown ? "text" : "password"}
                            placeholder="Confirm Password"
                            onChange={(e) => setCoPassword(e.target.value)}
                            required
                            className='forform'
                            name='CoPassword'
                        />
                        {!isMatch && <p>Password must match</p>}
                        <input
                            id="checkbx"
                            type="checkbox"
                            checked={Shown}
                            onChange={checkPassword}
                        />
                    </Stack>
                    <Stack>
                        <Button variant='contained' color='success' type='submit'> SignUp </Button>
                        <Stack>
                            <span>Already an account?</span><br></br>
                            <Link to='/CreateAcct'>Login</Link>
                        </Stack>
                    </Stack>
                </form>
            </div>
        </Stack>
    )
}

export default CreateAcct
