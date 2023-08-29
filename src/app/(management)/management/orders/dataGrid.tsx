"use client"
import MuiDataGrid from '@/components/client/DataGrid'
import LoadingBlocker from '@/components/client/LoadingBlocker';
import { DialogContext } from '@/components/management/context/DialogContext';
import CurrencyDisplay from '@/components/management/product/CurrencyDisplay';
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
            statusId: 3//TODO: HARDCODED status id
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
        {
            field: 'id',
            headerName: 'Order Nº',
            align: 'center',
            headerAlign: 'center',
            flex: .5
        },
        {
            field: 'contactForm.name',
            headerName: 'Contact Name',
            flex: 2,
            renderCell: (params: GridRenderCellParams) => {
                return <Typography><FontAwesomeIcon icon={faUser} className='mr-2'/>{params.row.contactForm.name}</Typography>
            }
        },
        {
            field: 'contactForm.email',
            headerName: 'Email',
            flex: 3,
            renderCell: (params: GridRenderCellParams) => {
                return <Typography><FontAwesomeIcon icon={faEnvelope} className='mr-2'/>{params.row.contactForm.email}</Typography>
            }
        },
        {
            field: 'contactForm.phone',
            headerName: 'Phone',
            flex: 1.5,
            renderCell: (params: GridRenderCellParams) => {
                let phone = params.row.contactForm.phone;
                if (!(phone.startsWith('+')||phone.startsWith('54'))) {
                    phone = `54${phone}`
                }
                return <Typography className='flex justify-center items-center'>
                    <FontAwesomeIcon icon={faPhone} className='mr-2'/>{params.row.contactForm.phone}
                    <Tooltip title="Enviar mensaje de Whatsapp" placement="top">
                        <IconButton href={`https://wa.me/${phone}?text=Hola%20${params.row.contactForm.name},%20tu%20pedido%20está%20listo%20para%20retirar%20en%20nuestra%20tienda!`} target="_blank" className="ml-2">
                            <FontAwesomeIcon icon={faWhatsapp} className='text-green-500' />
                        </IconButton>
                    </Tooltip>
                </Typography>
            }
        },
        {
            field: 'orderDate',
            headerName: 'Order Date',
            flex: 1.5,
            valueFormatter: (params: GridValueFormatterParams) => {
                return new Date(params.value as string).toLocaleString()
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
        },
        {
            field: "actions",
            headerName: "Actions",
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
        <Dialog open={selected?true:false} className='w-screen'>
            <DialogTitle className='p-2 flex items-center justify-between border-b mb-2'>
                <Typography className='mx-2 p-0'>Pedido #{selected?selected.id:''}</Typography>
                <IconButton
                    size='small'
                    className='py-0'
                    aria-label="close"
                    onClick={() => {setSelected(null)}}>
                    <FontAwesomeIcon icon={faClose} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <table className="table-fixed">
                    <tr>
                        <th>Imagen</th>
                        <th>Descripción</th>
                        <th>Cant.</th>
                        <th className='text-center'>Precio</th>
                    </tr>
                {selected&&selected.orderLines.map((orderLine: any) => {
                    return<tr className='border'>
                        <td className='border w-20 h-20 text-center p-2'>
                            <Image src={orderLine.item.images?.[0]} className='rounded w-16 h-16 object-cover max-w-none' width={64} height={64} alt={''} />
                        </td>
                        <td className='border text-center py-2 px-4'>
                            <Typography className='font-bold text-xs'>{orderLine.item.masterProduct.name}</Typography>
                            <Chip size='small' className='text-xs' label={<Box className="flex">
                                <Typography className='text-xs font-bold mr-1'>SKU:</Typography>
                                {`${orderLine.item.sku}`}
                                <FontAwesomeIcon className='ml-2 text-slate-500 hover:text-slate-900' icon={faCopy}/>
                            </Box>} onClick={async ()=>{navigator.clipboard.writeText(orderLine.item.sku).then(
                                () => enqueueSnackbar('SKU copiado al portapapeles!', {variant: 'success'})
                            )}}/>
                            <Box className="flex justify-center my-1">
                                {orderLine.item.variationOptions.map((variationOption: any) => {

                                        return <Typography key={variationOption.id} variant='caption' className='ml-2 whitespace-nowrap flex'>{variationOption.variation.name}:
                                            {(variationOption.variation.name.toLowerCase()=='color')?
                                                <div key={variationOption.id} className='border-black ml-1 whitespace-nowrap border rounded-full w-4 h-4' style={{backgroundColor: variationOption.value}}></div>
                                                :
                                                <span className='font-bold'>{variationOption.value}</span>
                                            }
                                            
                                        </Typography>
                                })}
                            </Box>
                            <Box className="flex justify-center items-center my-1">
                                <span className='text-xs font-bold'>Precio:</span>
                                <CurrencyDisplay className='text-xs text-center mx-1' value={orderLine.item.price} />
                            </Box>
                        </td>
                        <td className='border text-center'>
                            <Typography className='font-bold'>x{orderLine.qty}</Typography>
                        </td>
                        <td className='text-center'>
                            <Box className="text-center p-2">
                                <Typography className='font-bold flex flex-col justify-center items-center'>
                                    <CurrencyDisplay className='text-sm text-center w-4' value={orderLine.qty*orderLine.item.price} />
                                </Typography>
                            </Box>
                        </td>
                    </tr>
                })}
                </table>
                {/*Datos Contacto*/}
                <Box className='border-b mb-2 py-2'>
                    <Typography className='font-bold'>Datos de contacto</Typography>
                    <Typography className='text-xs'><b>Nombre:</b> {selected?.contactForm.name} {selected?.contactForm.lastName}</Typography>
                    <Typography className='text-xs'><b>Email:</b> {selected?.contactForm.email}</Typography>
                    <Typography className='text-xs'><b>Tel.:</b> {selected?.contactForm.phone}</Typography>
                </Box>
                <Box className='flex justify-end mb-2'>
                    <Typography className='font-bold text-xl'>Total: <CurrencyDisplay className='' value={selected?.orderLines.reduce((acc: number, orderLine: any) => {
                        return acc + orderLine.item.price*orderLine.qty
                    }, 0)} /></Typography>
                </Box>
                <Divider/>               
                <Box className='flex justify-end'>
                    <Button onClick={()=>{handleMoveToPaymentAcceptedStatus(selected.id)}} className='my-2 flex items-center text-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>
                        <FontAwesomeIcon icon={faCheckToSlot} className='mr-2' />
                        <Typography>Confirmar Pago</Typography>
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
        <MuiDataGrid loading={loading} columns={columns} rows={rows} rowCount={rowCount} />
    </>)
}

export default OrderDataGrid