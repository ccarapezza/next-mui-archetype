"use client"
import CurrencyDisplay from '@/components/management/product/CurrencyDisplay';
import { ShopOrderDto } from '@/schemas/shopOrder';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCheckToSlot, faClose, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';

interface ActionButtonProps {
    label: string;
    icon: IconProp;
    onAction: (order: ShopOrderDto) => void;
    className?: string;
}

function OrderDialog({order, open, onClose, actionsButtons}: {order: any, open: boolean, onClose: any, actionsButtons?: ActionButtonProps[]}) {
    return (<Dialog open={open} className='w-screen'>
        <DialogTitle className='p-2 flex items-center justify-between border-b mb-2'>
            <Typography className='mx-2 p-0'>Pedido #{order ? order.id : ''}</Typography>
            <IconButton
                size='small'
                className='py-0'
                aria-label="close"
                onClick={onClose}>
                <FontAwesomeIcon icon={faClose} />
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <table className="table-fixed">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Descripción</th>
                        <th>Cant.</th>
                        <th className='text-center'>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {order && order.orderLines.map((orderLine: any) => {
                        return <tr key={`order-line-${orderLine.id}`} className='border'>
                            <td className='border w-20 h-20 text-center p-2'>
                                <Image src={orderLine.item.images?.[0]} className='rounded w-16 h-16 object-cover max-w-none' width={64} height={64} alt={''} />
                            </td>
                            <td className='border text-center py-2 px-4'>
                                <Typography className='font-bold text-xs'>{orderLine.item.masterProduct.name}</Typography>
                                <Chip size='small'
                                    className='text-xs'
                                    label={
                                        <Box className="flex">
                                            <Typography className='text-xs font-bold mr-1'>SKU:</Typography>
                                            {`${orderLine.item.sku}`}
                                            <FontAwesomeIcon className='ml-2 text-slate-500 hover:text-slate-900' icon={faCopy} />
                                        </Box>
                                    }
                                    onClick={async () => {
                                        navigator.clipboard.writeText(orderLine.item.sku).then(() =>
                                            enqueueSnackbar('SKU copiado al portapapeles!', { variant: 'success' })
                                        )
                                    }}
                                />
                                <Box className="flex justify-center my-1">
                                    {orderLine.item.variationOptions.map((variationOption: any) => {

                                        return <Typography key={variationOption.id} variant='caption' className='ml-2 whitespace-nowrap flex'>{variationOption.variation.name}:
                                            {(variationOption.variation.name.toLowerCase() == 'color') ?
                                                <div key={variationOption.id} className='border-black ml-1 whitespace-nowrap border rounded-full w-4 h-4' style={{ backgroundColor: variationOption.value }}></div>
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
                                        <CurrencyDisplay className='text-sm text-center w-4' value={orderLine.qty * orderLine.item.price} />
                                    </Typography>
                                </Box>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            {/*Contact Information*/}
            <Box className='border-b mb-2 py-2'>
                <Typography className='font-bold'>Datos de contacto</Typography>
                <Typography className='text-xs'><b>Nombre:</b> {order?.contactForm.name} {order?.contactForm.lastName}</Typography>
                <Typography className='text-xs'><b>Email:</b> {order?.contactForm.email}</Typography>
                <Typography className='text-xs'><b>Tel.:</b> {order?.contactForm.phone}</Typography>
            </Box>
            {/*Total Order Summary*/}
            <Box className='flex flex-col mb-2'>
                <Typography className='flex items-center justify-between font-bold'>Subtotal: <CurrencyDisplay className='' value={order?.orderLines.reduce((acc: number, orderLine: any) => {
                    return acc + (orderLine.item.price * orderLine.qty)
                }, 0)} /></Typography>
                <Typography className='flex items-center justify-between font-bold'>Cupón de descuento "{order?.discountsApplied?.checkout_discounts.coupon}":  <CurrencyDisplay className='' value={
                    order?.discountsApplied?.checkout_discounts.coupon_type === "percentage" ?
                        order?.discountsApplied?.checkout_discounts.value * order?.orderLines.reduce((acc: number, orderLine: any) => {
                            return acc + (orderLine.item.price * orderLine.qty)
                        }, 0) / 100
                        :
                        order?.discountsApplied?.checkout_discounts.value
                } /></Typography>
                <Typography className='flex items-center justify-between font-bold text-xl'>Total: <CurrencyDisplay className='' value={order?.orderLines.reduce((acc: number, orderLine: any) => {
                    //Discounted Total Calculator
                    const { discountsApplied } = order;
                    if (discountsApplied) {
                        const { checkout_discounts } = discountsApplied;
                        const { coupon_type, value: discountValue } = checkout_discounts;
                        const total = orderLine.item.price * orderLine.qty;
                        if (coupon_type === "percentage") {
                            return acc + (total - (total * discountValue / 100))
                        } else if (coupon_type === "fixedAmount") {
                            return acc + (total - discountValue)
                        }
                    }
                }, 0)} /></Typography>
            </Box>
            {/*Actions*/}
            <Divider />
            <Box className='flex justify-end'>
                {actionsButtons && actionsButtons.map(({ label, icon, onAction, className }) => {
                    const classNameDefault = className?className:'bg-green-500 hover:bg-green-600 text-white';
                    return <Button key={`action-button-${label}`} onClick={() => { onAction(order) }} className={'my-2 flex items-center text-center px-4 py-2 rounded-md '+classNameDefault}>
                        <FontAwesomeIcon icon={icon} className='mr-2' />
                        <Typography>{label}</Typography>
                    </Button>
                })}
            </Box>
        </DialogContent>
    </Dialog>)
}

export default OrderDialog