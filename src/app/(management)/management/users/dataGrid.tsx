"use client"
import MuiDataGrid from '@/components/client/DataGrid'
import { Chip, Stack } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

function UserDataGrid({ data, rows, rowCount, editPath, deletePath }: { data?: any, rows: any[], rowCount: number, editPath?: string, deletePath?: string }) {
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 1,
            cellClassName: 'text-xs'
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1
        },
        {
            field: 'emailVerified',
            headerName: 'Email Verified',
            flex: 1,
            cellClassName: 'flex justify-center',
            renderCell: (params: GridRenderCellParams) => {
                return (<Chip className={`${params?.value?"bg-green-500":"bg-red-500"}  text-xs text-white`} label={params?.value ? 'Verified' : 'No'} />)
            }
        },
        {
            field: 'roles',
            headerName: 'Roles',
            flex: 2,
            renderCell: (params: GridRenderCellParams) => {
                return (<Stack direction={'row'} gap={1}>
                    {params?.value?.map((item: any, index: number) =>
                        <Chip variant='outlined' key={item.id} label={item.name?.toUpperCase()} className='text-xs' />
                    )}
                </Stack>)
            }
        }
    ];

    return (
        <MuiDataGrid columns={columns} rows={rows} rowCount={rowCount} editPath={editPath} deletePath={deletePath} />
    )
}

export default UserDataGrid