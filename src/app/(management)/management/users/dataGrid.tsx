"use client"
import MuiDataGrid from '@/components/client/DataGrid'
import { getRoleDataByName } from '@/utils/RoleDataUtil';
import { faAtom, faPaperPlane, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip, Stack, Tooltip } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

function UserDataGrid({ data, rows, rowCount, editPath, deletePath }: { data?: any, rows: any[], rowCount: number, editPath?: string, deletePath?: string }) {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState<boolean>(false)
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return (<Tooltip title={params?.value}>
                    {params?.value}
                </Tooltip>)
            }
        },
        {
            field: 'emailVerified',
            headerName: 'Email Verified',
            headerAlign: 'center',
            flex: 1,
            cellClassName: 'flex justify-center',
            renderCell: (params: GridRenderCellParams) => {
                return (<Chip className={`${params?.value ? "bg-green-500" : "bg-red-500"}  text-xs text-white`} label={params?.value ? 'Verified' : 'No'} />)
            }
        },
        {
            field: 'roles',
            headerName: 'Roles',
            flex: 2,
            renderCell: (params: GridRenderCellParams) => {
                return (<Stack direction={'row'} gap={1}>
                    {params?.value?.filter((item: { name: string; })=>item.name!=="user").map((item: any, index: number) =>
                        <Chip variant='outlined' key={"roles-"+item.id} icon={<FontAwesomeIcon className='pl-2' icon={getRoleDataByName(item.name).icon}/>} label={getRoleDataByName(item.name).label} className='text-xs' />
                    )}
                </Stack>)
            }
        }
    ];

    const resendVerificationEmail = async (email: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/auth/resend-verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        });
        if (!res.ok) {
            const errorData = await res?.json();
            console.log("errorData", errorData);
            throw new Error((errorData.error) ? (errorData.error) : "Error sending verification email");
        }
        return res.json();
    };

    const resetPassword = async (email: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/user/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        });
        if (!res.ok) {
            const errorData = await res?.json();
            console.log("errorData", errorData);
            throw new Error((errorData.error) ? (errorData.error) : "Error sending verification email");
        }
        return res.json();
    };

    return (
        <MuiDataGrid
            loading={loading}
            columns={columns}
            rows={rows}
            rowCount={rowCount}
            editPath={editPath}
            deletePath={deletePath}
            customActions={[
                {
                    icon: faPaperPlane,
                    title: 'Resend verification email',
                    show: (row: any) => !row.emailVerified,
                    action: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: any) => {
                        setLoading(true);
                        resendVerificationEmail(row.email).then((data) => {
                            enqueueSnackbar("Verification email sent", { variant: 'success' });
                        }).catch((error) => {
                            enqueueSnackbar("Verification email not sent", { variant: 'error' });
                        }).finally(() => {
                            setLoading(false);
                        });
                    }
                },
                {
                    title: 'Reset password',
                    icon: faUnlockKeyhole,
                    show: (row: any) => row.emailVerified,
                    action: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: any) => {
                        setLoading(true);
                        resetPassword(row.email).then((data) => {
                            enqueueSnackbar("Password reset email sent", { variant: 'success' });
                        }).catch((error) => {
                            enqueueSnackbar("Password reset email not sent", { variant: 'error' });
                        }).finally(() => {
                            setLoading(false);
                        });
                    }
                }
            ]}
        />
    )
}

export default UserDataGrid