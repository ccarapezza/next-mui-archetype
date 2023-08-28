"use client"
import MuiDataGrid from '@/components/client/DataGrid'
import CurrencyDisplay from '@/components/management/product/CurrencyDisplay';
import { faFirstOrder, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faArrowRightFromFile, faArrowRightLong, faCheckToSlot, faClose, faEnvelope, faFileInvoice, faFileInvoiceDollar, faLocationArrow, faMarsAndVenus, faPhone, faProcedures, faTicket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, Stack, Tooltip, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import Image from 'next/image';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

function OrderDataGrid({ data, rows, rowCount}: { data?: any, rows: any[], rowCount: number }) {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false)

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
                        <td className='border w-20 h-20 text-center'>
                            <Image src={orderLine.item.images?.[0]} className='p-2 w-20 h-20 object-cover max-w-none' width={64} height={64} alt={''} />
                        </td>
                        <td className='border text-center'>
                            <Typography className='font-bold text-xs'>{orderLine.item.masterProduct.name}</Typography>
                            <Typography variant='caption' className='font-bold text-xs'>{orderLine.item.sku}</Typography>
                            <Box>
                                {orderLine.item.variationOptions.map((variationOption: any) => {

                                        return <Typography key={variationOption.id} variant='caption' className='ml-2 whitespace-nowrap'>{variationOption.variation.name}:
                                            {(variationOption.variation.name.toLowerCase()=='color')?
                                                <div key={variationOption.id} className='border-black ml-2 whitespace-nowrap border rounded-full inline-block w-4 h-4' style={{backgroundColor: variationOption.variation.value}}></div>
                                                :
                                                <span>{variationOption.value}</span>
                                            }
                                            
                                        </Typography>
                                })}
                            </Box>
                        </td>
                        <td className='border text-center'>
                            <Typography className='font-bold'>x{orderLine.qty}</Typography>
                        </td>
                        <td className='text-center'>
                            <Box className="text-center p-2">
                                <CurrencyDisplay className='text-xs text-center' value={orderLine.item.price} />
                                    
                                <Typography className='font-bold flex justify-center'>
                                    <CurrencyDisplay className='text-sm text-center w-4' value={orderLine.qty*orderLine.item.price} />
                                </Typography>
                            </Box>
                        </td>
                    </tr>
                })}
                </table>
                {/*Datos Contacto*/}
                <Box className='border-b mb-2 py-2'>
                    <Typography className='font-bold text-xs'>Datos de contacto</Typography>
                    <Typography className='text-xs'><b>Nombre:</b> {selected?.contactForm.name} {selected?.contactForm.lastName}</Typography>
                    <Typography className='text-xs'><b>Email:</b> {selected?.contactForm.email}</Typography>
                    <Typography className='text-xs'><b>Tel.:</b> {selected?.contactForm.phone}</Typography>
                </Box>
                <Box className='flex'>
                    <Typography className='font-bold text-xl'>Total: <CurrencyDisplay className='' value={selected?.orderLines.reduce((acc: number, orderLine: any) => {
                        return acc + orderLine.item.price*orderLine.qty
                    }, 0)} /></Typography>
                </Box>
                <Divider/>               
                <Box className='flex justify-end'>
                    <Link className='my-2 flex items-center text-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md' href={`/management/orders/${selected?.id}`}>
                        <FontAwesomeIcon icon={faCheckToSlot} className='mr-2' />
                        <Typography>Confirmar</Typography>
                    </Link>
                </Box>
            </DialogContent>
        </Dialog>
        <MuiDataGrid loading={loading} columns={columns} rows={rows} rowCount={rowCount} />
    </>)
}

export default OrderDataGrid