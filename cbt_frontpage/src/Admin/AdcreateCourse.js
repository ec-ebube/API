import { Button, Stack, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { createcourse } from '../Endpoints'
import useCreate from '../hooks/useCreate'
import { useNavigate } from 'react-router-dom'

function AdcreateCourse() {

    const navigate = useNavigate();
    const { createUser, /*data,*/ isLoading, error } = useCreate()

    const [Name, setName] = useState("")
    const [Description, setDescription] = useState("")

    const courseCreating = async (e) => {
        e.preventDefault()
        try {
            const formdata = new FormData()
            formdata.append('Name', Name)
            formdata.append('Description', Description)

            await createUser(createcourse, formdata)
            navigate('admin/courses')
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            {isLoading && <div>Creating...</div>}
            {error && <div>{Error}</div>}
            <form onSubmit={courseCreating} style={{
                maxWidth: '5vw',
                alignSelf: 'center',
                // padding: 'auto',
                margin: 'auto'
            }}>
                <Stack direction='column' spacing={4}>
                    <TextField
                        label='Course Name'
                        variant='standard'
                        autoFocus
                        name='Name'
                        className='forform'
                        color='success'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label='Course Description'
                        variant='standard'
                        required
                        name='Description'
                        className='forform'
                        color='success'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Stack sx={{
                        maxWidth: '5vw',
                        alignContent: 'center',
                        padding: 'auto'
                    }}>

                        <Button variant='contained' color='success' type='submit' > Create </Button>
                    </Stack>
                </Stack>
            </form>
        </div>
    )
}

export default AdcreateCourse
