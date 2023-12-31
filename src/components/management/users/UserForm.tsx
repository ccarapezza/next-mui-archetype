"use client"
import MuiBox from '@/components/client/MuiBox'
import { RoleDto } from '@/schemas/role'
import { getRoleDataByName } from '@/utils/RoleDataUtil'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button, Card, Checkbox, Chip, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup";

interface IUserForm {
    name: string
    email: string
}

const schema = yup.object({
    name: yup.string().min(3).max(20).required(),
    email: yup.string().email().required()
}).required();

const updateUserData = async (userData: any) => {
    console.log("userData", userData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/user/edit/${userData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    if(!res.ok){
        throw new Error((await res.json()).error||res.statusText);
    }
    return res.json();
};

const saveUserData = async (userData: any) => {
    console.log("userData", userData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/user/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    if(!res.ok){
        throw new Error((await res.json()).error||res.statusText);
    }
    return res.json();
};

export default function UserForm({ userData, roles, preSelectedRoles }: { userData: any, roles?: RoleDto[], preSelectedRoles?: RoleDto[] }) {
    const [userRoles, setUserRoles] = useState<RoleDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<IUserForm>({
        resolver: yupResolver(schema)
    });

    const handleToggle = (role: RoleDto) => {
        const currentIndex = userRoles.findIndex((r: RoleDto) => r.id === role.id);
        const newChecked: RoleDto[] = [...userRoles];

        if (currentIndex === -1) {
            newChecked.push(role);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setUserRoles(newChecked);
    }

    useEffect(() => {
        if(userData?.roles){
            setUserRoles(userData.roles);
        }
    }, [userData]);

    console.log("data", userData);
    const onSubmit = async (data: IUserForm) => {
        setLoading(true);
        const reqObj = {
            ...userData,
            ...data,
            roles: userRoles.map(role => role.id)
        };
        const saveFunction = userData.id ? updateUserData : saveUserData;
        saveFunction(reqObj).then((response) => {
            console.log("response", response);
            enqueueSnackbar(userData.id ? 'Update success!' : 'Create success!', { variant: 'success' });
            router.push('/management/users');
            router.refresh();//Need to refresh the page to get the updated data
        }).catch((err: any) => {
            enqueueSnackbar('Error: ' + err.message, { variant: 'error' });
            console.log("err", err);
        }).finally(() => {
            setLoading(false);
        });
    };
    
    return (<Card variant='outlined' className='max-w-full lg:max-w-2xl'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container padding={2} gap={2}>
                {userData.id &&
                    <>
                        <Grid item xs={12} className='flex flex-row justify-center items-center'>
                            <Avatar alt={userData.name} src={userData.image} className='w-32 h-32' />
                        </Grid>
                        <Grid item xs={12} className='flex flex-row items-center gap-2'>
                            <Typography className='font-bold'>ID</Typography><Chip label={userData.id} />
                        </Grid>
                    </>
                }
                <Grid item xs={12}>
                    <TextField
                        {...register("name")}
                        label="Nombre de Usuario"
                        type="text"
                        fullWidth
                        autoComplete='off'
                        error={!!errors.name}
                        defaultValue={userData.name} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...register("email")}
                        label="Email"
                        type="email"
                        fullWidth
                        autoComplete='off'
                        error={!!errors.email}
                        defaultValue={userData.email} />
                </Grid>
                <Grid item xs={12}>
                    <MuiBox component="fieldset" className="border rounded-md">
                        <legend className='mx-2 px-2'>Roles</legend>
                        <List>
                            {preSelectedRoles?.map((role) => {
                                const labelId = `checkbox-list-label-${role.id}`;
                                return (
                                    <ListItem
                                        key={"role-" + role.id}
                                        disablePadding
                                        className='m-0 p-0 pl-4'
                                    >
                                        <ListItemButton disabled dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={true}
                                                    tabIndex={-1}
                                                    disabled
                                                    className='my-0 py-0'
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText  id={labelId} primary={<Chip icon={<FontAwesomeIcon className='pl-2' icon={getRoleDataByName(role.name).icon}/>} variant='outlined' label={getRoleDataByName(role.name).label} className='uppercase drop-shadow-md'/>} secondary={<span className='ml-4'>{getRoleDataByName(role.name).description}</span>}/>
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                            {roles?.map((role) => {
                                const labelId = `checkbox-list-label-${role.id}`;
                                return (
                                    <ListItem
                                        key={"role-" + role.id}
                                        disablePadding
                                        className='m-0 p-0 my-2 pl-4'
                                    >
                                        <ListItemButton onClick={() => { handleToggle(role); }} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={userRoles.findIndex((r: RoleDto) => r.id === role.id) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    className='my-0 py-0'
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText  id={labelId} primary={<Chip icon={<FontAwesomeIcon className='pl-2' icon={getRoleDataByName(role.name).icon}/>} variant='outlined' label={getRoleDataByName(role.name).label} className='uppercase'/>} secondary={<p className='ml-2'>{getRoleDataByName(role.name).description}</p>}/>
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </MuiBox>
                </Grid>
                <Grid item xs={12} className='flex flex-row justify-end items-center gap-2'>
                    <Button type='submit' disabled={loading} startIcon={<FontAwesomeIcon icon={faSave} />} variant="contained" color="primary">
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Card>)
}
