import React from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { userUpdate, userURL } from '../Endpoints';
import { Button, Stack, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import usePatch from '../hooks/usePatch';
import { Edit, UpdateOutlined } from '@mui/icons-material';

function User() {
    const { Id } = useParams()
    var user = JSON.parse(localStorage.getItem('user'));
    var token = JSON.parse(user.Token);
    token = token.token;

    const url = userUpdate + Id + '/update'


    const [update, setUpdate] = useState(true)
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    // const [Role, setRole] = useState("")
    const { data, isLoading, error } = useFetch(userURL + Id + "/get", token);
    const { updateUser } = usePatch(url)

    useEffect(() => {
        if (data) {
            setFirstName(data.FirstName);
            setLastName(data.LastName);
            setEmail(data.Email);
            setPhoneNumber(data.PhoneNumber);
            // setRole(data.Role);
        }


    }, [data])

    // if (data) {
    //     console.log(data);
    // }
    const editUser = () => {
        setUpdate(false);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formdata = new FormData()
            formdata.append('FirstName', FirstName)
            formdata.append('LastName', LastName)
            formdata.append('Email', Email)
            formdata.append('PhoneNumber', PhoneNumber)
            // formdata.apend('Role', Role)

            await updateUser(url, formdata)
            console.log(data.Updated_at);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            {isLoading && <div>Loading ...</div>}
            {isLoading && <div>{error}</div>}
            {data && <div>
                {update ?
                    <Stack spacing={2} direction='column'
                        sx={{ textAlign: 'center' }}
                    >
                        <div>
                            <p>FirstName: </p>
                            <TextField
                                value={data.FirstName}
                                name='FirstName'
                                variant='outlined'
                                color='success'
                                label='FirstName'
                            />
                        </div>
                        <div>
                            <p>LastName:</p>
                            <TextField
                                value={data.LastName}
                                name='LastName'
                                variant='outlined'
                                color='success'
                                label='LastName'
                            />
                        </div>
                        <div>
                            <p>Email:</p>
                            <TextField
                                value={data.Email}
                                name='Email'
                                variant='outlined'
                                color='success'
                                label='Email'
                            />
                        </div>
                        <div>
                            <p>PhoneNumber:</p>
                            <TextField
                                value={data.PhoneNumber}
                                name='PhoneNumber'
                                variant='outlined'
                                color='success'
                                label='PhoneNumber'
                            />
                        </div>
                        <div>
                            <p>Role:</p>
                            <TextField
                                value={data.Role}
                                name='Role'
                                variant='outlined'
                                color='success'
                                label='Role'
                            />
                        </div>
                        <div>
                            <p>Joined:</p>
                            <TextField
                                value={data.Created_at}
                                name='Joined'
                                variant='outlined'
                                color='success'
                                label='joined'
                            />
                        </div>
                        <div className='Btn'>
                            <Button variant='contained' color='warning' onClick={editUser} disabled={isLoading} startIcon={<Edit />}> Edit User </Button>
                        </div>
                    </Stack> :
                    <Stack spacing={2} direction='column'
                        sx={{ textAlign: 'center' }}
                    >
                        <div>
                            <p>FirstName:  </p>
                            <TextField
                                value={FirstName}
                                name='FirstName'
                                variant='outlined'
                                color='success'
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <p>LastName:</p>
                            <TextField
                                value={LastName}
                                name='LastName'
                                variant='outlined'
                                color='success'
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div>
                            <p>Email:</p>
                            <TextField
                                // value={Email}
                                name='Email'
                                variant='outlined'
                                color='success'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <p>PhoneNumber:</p>
                            <TextField
                                value={PhoneNumber}
                                name='PhoneNumber'
                                variant='outlined'
                                color='success'
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div>
                            <p>Role:</p>
                            <TextField
                                value={data.Role}
                                name='Role'
                                variant='outlined'
                                color='success'
                            />
                        </div>
                        <div className='Btn'>
                            <Button variant='contained' color='warning' onClick={handleUpdate} disabled={isLoading} startIcon={<UpdateOutlined />}> Update </Button>
                        </div>
                    </Stack>
                }
            </div>}
        </div>
    )
}

export default User