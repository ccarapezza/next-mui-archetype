"use client"
import CurrencyDisplay from '@/components/management/product/CurrencyDisplay';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Orden Nº',
        align: 'center',
        headerAlign: 'center',
        flex: .5
    },
    {
        field: 'orderDate',
        headerName: 'Fecha',
        flex: 1.5,
        valueFormatter: (params: GridValueFormatterParams) => {
            return new Date(params.value as string).toLocaleString()
        }
    },
    {
        field: 'contactForm.name',
        headerName: 'Contacto',
        flex: 2,
        renderCell: (params: GridRenderCellParams) => {
            return <Stack direction={'column'}>
                <Typography className='text-xs'><FontAwesomeIcon icon={faUser} className='mr-2' fixedWidth/>{params.row.contactForm.name}</Typography>
                <Typography className='text-xs'><FontAwesomeIcon icon={faEnvelope} className='mr-2' fixedWidth/>{params.row.contactForm.email}</Typography>
            </Stack>
        }
    },
    {
        field: 'contactForm.phone',
        headerName: 'Teléfono',
        flex: 1.5,
        renderCell: (params: GridRenderCellParams) => {
            let phone = params.row.contactForm.phone;
            if (!(phone.startsWith('+')||phone.startsWith('54'))) {
                phone = `54${phone}`
            }
            return <Typography className='flex justify-center items-center'>
                <FontAwesomeIcon icon={faPhone} className='mr-2'/><Typography className='text-xs'>{params.row.contactForm.phone}</Typography>
                <Tooltip title="Enviar mensaje de Whatsapp" placement="top">
                    <IconButton href={`https://wa.me/${phone}?text=Hola%20${params.row.contactForm.name},%20tu%20pedido%20está%20listo%20para%20retirar%20en%20nuestra%20tienda!`} target="_blank" className="ml-2">
                        <FontAwesomeIcon icon={faWhatsapp} className='text-green-500' />
                    </IconButton>
                </Tooltip>
            </Typography>
        }
    },
    {
        field: "orderTotal",
        headerName: "Total",
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            return <Stack direction={'column'}>
                <CurrencyDisplay value={params.row.orderTotal} />
                <Typography variant='caption' className='font-bold'>{params.row.orderLines.length} Productos</Typography>
            </Stack>
        }
    }    
];

export const DefaultOrderDataGridColumns = {
    columns: columns,
}