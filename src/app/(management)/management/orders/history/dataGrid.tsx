"use client"
import MuiDataGrid from '@/components/client/DataGrid'
import LoadingBlocker from '@/components/client/LoadingBlocker';
import { DialogContext } from '@/components/management/context/DialogContext';
import { DefaultOrderDataGridColumns } from '@/components/management/orders/DefaultOrderDataGridColumns';
import OrderDialog from '@/components/management/orders/OrderDialog';
import CurrencyDisplay from '@/components/management/product/CurrencyDisplay';
import { OrderStatus } from '@/schemas/orderStatus';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightFromFile, faCheckToSlot, faClose, faCopy, faEnvelope, faMagnifyingGlass, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useContext, useState } from 'react';

const moveToPaymentAcceptedStatus = async (shopOrderId: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/shop-order/move-status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shopOrderId: shopOrderId,
            statusId: OrderStatus.Pending
        })
    });
    if(!res.ok){
        const errorData = await res?.json();
        console.log("errorData", errorData);
        throw new Error((errorData.error)?(errorData.error):"Error al actualizar el pedido");
    }
    return res.json();
}

function OrderDataGrid({ data, rows, rowCount}: { data?: any, rows: any[], rowCount: number }) {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { showConfirm } = useContext(DialogContext);

    //SELECTED ROWS
    const [selected, setSelected] = useState<any>(null);
    const columns: GridColDef[] = [
        ...DefaultOrderDataGridColumns.columns,
        {
            field: "actions",
            headerName: "Acciones",
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return <>
                    <Tooltip title="Ver detalles del pedido" placement='top'>
                        <IconButton size='small' onClick={(e) => {setSelected(params.row)}}>
                            <FontAwesomeIcon fixedWidth icon={faMagnifyingGlass} />
                        </IconButton>
                    </Tooltip>
                </>
            }
        }
    ];

    return (<>
        {loading&&selected&&
            <LoadingBlocker />
        }
        <OrderDialog open={selected?true:false} order={selected} onClose={()=>{setSelected(null)}} actionsButtons={[
            {label: 'Cerrar', icon: faClose, onAction: (order: any)=>{setSelected(null)}, className: 'bg-red-500 hover:bg-red-600 text-white'},
        ]}/>
        <MuiDataGrid loading={loading} columns={columns} rows={rows} rowCount={rowCount} />
    </>)
}

export default OrderDataGrid