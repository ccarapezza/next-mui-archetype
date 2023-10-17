"use client"
import MuiDataGrid from '@/components/client/DataGrid'
import { Chip, Tooltip } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

function ClientDataGrid({ data, rows, rowCount, editPath, deletePath }: { data?: any, rows: any[], rowCount: number, editPath?: string, deletePath?: string }) {
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Nombre de usuario',
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
            headerName: 'Cuenta verificada',
            headerAlign: 'center',
            flex: 1,
            cellClassName: 'flex justify-center',
            renderCell: (params: GridRenderCellParams) => {
                return (<Chip className={`${params?.value ? "bg-green-500" : "bg-red-500"}  text-xs text-white`} label={params?.value ? 'Verificado' : 'No verificado'} />)
            }
        }       
    ];

    return (
        <MuiDataGrid
            columns={columns}
            rows={rows}
            rowCount={rowCount}
            editPath={editPath}
            deletePath={deletePath}
        />
    )
}

export default ClientDataGrid