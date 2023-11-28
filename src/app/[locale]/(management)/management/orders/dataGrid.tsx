"use client"
import MuiDataGrid from '@/components/client/DataGrid'
import LoadingBlocker from '@/components/client/LoadingBlocker';
import { DialogContext } from '@/components/management/context/DialogContext';
import { DefaultOrderDataGridColumns } from '@/components/management/orders/DefaultOrderDataGridColumns';
import OrderDialog from '@/components/management/orders/OrderDialog';
import CurrencyDisplay from '@/components/management/product/CurrencyDisplay';
import { OrderStatus } from '@/schemas/orderStatus';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightFromFile, faCheckToSlot, faClose, faCopy, faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
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
            statusId: OrderStatus.PaymentAccepted
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

    

    const handleMoveToPaymentAcceptedStatus = async (shopOrderId: any) => {

        showConfirm("Confirmar Pago", "Estás seguro que deseas confirmar el pago?", () => {
            setLoading(true)
            moveToPaymentAcceptedStatus(shopOrderId).then(()=>{
                enqueueSnackbar('Pedido actualizado correctamente', {variant: 'success'})
                router.refresh();
                setSelected(null)
            }).catch(()=>{
                enqueueSnackbar('Error al actualizar el pedido', {variant: 'error'})
            }).finally(()=>{
                setLoading(false)
            });
        },() => {

        });
    }

    //SELECTED ROWS
    const [selected, setSelected] = useState<any>(null);
    const columns: GridColDef[] = [
        ...DefaultOrderDataGridColumns.columns,
        {
            field: "actions",
            headerName: "Acciones",
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return <>
                    <Tooltip title="Procesar pedido" placement='top'>
                        <IconButton size='small' onClick={(e) => {setSelected(params.row)}}>
                            <FontAwesomeIcon fixedWidth icon={faArrowRightFromFile} />
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
            {label: 'Confirmar Pago', icon: faCheckToSlot, onAction: (order: any)=>{handleMoveToPaymentAcceptedStatus(order.id)}},
        ]}/>
        <MuiDataGrid loading={loading} columns={columns} rows={rows} rowCount={rowCount} />
    </>)
}

export default OrderDataGrid