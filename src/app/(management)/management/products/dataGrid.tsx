"use client"
import MuiDataGrid from '@/components/client/DataGrid'
import CurrencyDisplay from '@/components/management/product/CurrencyDisplay';
import { faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stack } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';

function ProductDataGrid({ data, rows, rowCount, editPath, deletePath }: { data?: any, rows: any[], rowCount: number, editPath?: string, deletePath?: string }) {
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 1
        },
        {
            field: 'name',
            headerName: 'Nombre',
            flex: 1
        },
        {
            field: 'description',
            headerName: 'Descripción',
            flex: 1
        },
        {
            field: 'category',
            headerName: 'Caregoría',
            flex: 1,
            valueGetter: (params: GridValueFormatterParams) => {
                return params.value.name;
            }
        },
        {
            field: 'items',
            headerName: 'Items',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return (<Stack direction={'column'}>
                    {params.value.map((item: any, index: number) =><Stack key={item.sku} direction={"row"} className='flex items-center'>
                        <span>#{index+1}</span><FontAwesomeIcon icon={faChevronRight} className='px-2'/><CurrencyDisplay value={item.price} />
                    </Stack>)}
                </Stack>)
            }
        },
        
    ];

    return (
        <MuiDataGrid columns={columns} rows={rows} rowCount={rowCount} editPath={editPath} deletePath={deletePath} />
    )
}

export default ProductDataGrid