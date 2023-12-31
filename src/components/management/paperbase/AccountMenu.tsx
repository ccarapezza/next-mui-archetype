'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faEnvelope, faSignOut, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { data } = useSession();
    const router = useRouter();
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Tooltip title="Account settings">
                <IconButton onClick={handleClick} size='small' color="inherit" className='p-1'>
                    <Avatar src={data?.user?.image!} alt="My Avatar" className='w-6 h-6' />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Avatar src={data?.user?.image!} alt="My Avatar" className='w-8 h-8' />
                    </ListItemIcon>
                    <div className='flex flex-col ml-3'>
                        <span className='font-bold'>{data?.user?.name}</span>
                        <span className='text-xs'><FontAwesomeIcon icon={faEnvelope} className='mr-1 text-gray-500'/>{data?.user?.email}</span>
                    </div>
                </MenuItem>
                <Divider />
                <MenuItem onClick={()=>{router.push('/management/my-profile')}}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faUserCog} />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={()=>{signOut()}}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faSignOut} />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}