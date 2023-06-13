import { Button, Drawer, IconButton, List, ListItemButton, ListItemIcon, Stack } from '@mui/material'
import React, { useState } from 'react'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { SupervisedUserCircle } from '@mui/icons-material';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

function AdDrawerComp() {


    const { user } = useAuthContext();
    const { logout } = useLogout();
    const [forDrawer, setForDrawer] = useState(false)

    const handleLogout = () => {
        logout();
        setForDrawer(false)
    }
    // var singleUser = JSON.parse(user)

    return (
        <React.Fragment>
            <Drawer open={forDrawer} onClose={() => setForDrawer(false)}>
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            {user ?
                                <Stack>
                                    <Button href="/admin/users" className="Link" variant="text" color="error" startIcon={<SupervisedUserCircle className="logoutIcon" />}>Users</Button>
                                    <Button href="/admin/courses" className="Link" variant="text" color="error" startIcon={<SupervisedUserCircle className="logoutIcon" />}>Courses</Button>
                                    <Button href="/admin/assessments" className="Link" variant="text" color="error" startIcon={<SupervisedUserCircle className="logoutIcon" />}>Assessments</Button>
                                    <Button className="Link" variant="text" color="error" /*startIcon={<CancelPresentationIcon />}*/ onClick={handleLogout}>Log Out</Button>
                                </Stack>
                                :
                                <Stack>
                                    <Button href="/login" /*label="Login"*/ className="Link" variant="text" color="error" startIcon={<LoginRoundedIcon />}> Login </Button>
                                    <Button href="/CreateAcct" className="Link" variant="outlined" color="warning" startIcon={<ExitToAppRoundedIcon />}> SignUp </Button>
                                </Stack>
                            }
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
            <IconButton onClick={() => setForDrawer(!forDrawer)}>
                <MenuBookIcon />
            </IconButton>
        </React.Fragment>
    )
}

export default AdDrawerComp
