"use client"
import MuiDataGrid from '@/components/client/DataGrid'
import CurrencyDisplay from '@/components/management/product/CurrencyDisplay';
import { ProductItemDto } from '@/schemas/productItem';
import { faChevronRight, faCircleMinus, faCirclePlus, faClose, faPlus, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

const MIN_STOCK_WARNING = 10;
interface StockItemSelector{
    item: ProductItemDto,
    productName: string,
    remove: boolean
}

function ProductDataGrid({ data, rows, rowCount, editPath, deletePath }: { data?: any, rows: any[], rowCount: number, editPath?: string, deletePath?: string }) {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false)
    const [itemSelected, setItemSelected] = useState<StockItemSelector|null>(null);
    const [stockNumber, setStockNumber] = useState<number>(0);
    const router = useRouter();

    const addStock = async (id: number, stock: number) => {
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/product/add-stock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                stock
            })
        })
        if (res.ok) {
            setLoading(false);
            setItemSelected(null);
            router.refresh()
            enqueueSnackbar('Stock agregado correctamente', { variant: 'success' })
        } else {
            setLoading(false);
            setItemSelected(null);
            router.refresh()
            enqueueSnackbar('Error al agregar stock', { variant: 'error' })
        }
    }

    const removeStock = async (id: number, stock: number) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/product/remove-stock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                stock
            })
        })
        if (res.ok) {
            setLoading(false);
            setItemSelected(null);
            router.refresh()
            enqueueSnackbar('Stock eliminado correctamente', { variant: 'success' })
        } else {
            setLoading(false);
            setItemSelected(null);
            router.refresh()
            enqueueSnackbar('Error al eliminar stock', { variant: 'error' })
        }
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            align: 'center',
            headerAlign: 'center'
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
            headerAlign: 'center',
            align: 'center',
            flex: 3,
            renderCell: (params: GridRenderCellParams) => {
                return (<Stack direction={'column'} className='cursor-pointer box-border w-full' >
                    {params.value.map((item: any, index: number) =>
                        
                            <Stack key={`product-item-${item.sku}`} direction={"row"} className='w-full grid grid-cols-2 px-2 rounded hover:bg-yellow-300 hover:bg-opacity-20'>

                                <Tooltip leaveDelay={0} key={`product-item-${item.sku}`} classes={{ tooltip: 'text-gray-700 px-3 my-1 border bg-white transform translate-x-1/2 shadow-md ml-8' }} followCursor title={
                                        <Stack>
                                            <Typography><b>ID: #</b>{item.id}</Typography>
                                            <Typography><b>SKU:</b> {item.sku}</Typography>
                                            {item.variationOptions.map((option: any, index: number) => <Typography key={`product-item-${item.sku}-variation-${option.variation.id}-option-${option.id}`}>
                                                <b>{option.variation.name}:</b> {option.value}
                                            </Typography>)}
                                        </Stack>
                                    }>
                                        <Box className="flex items-center">
                                            <Box className="m-0 p-0">
                                                <span>#{item.id}</span>
                                                <FontAwesomeIcon icon={faChevronRight} className='px-2' />
                                                <CurrencyDisplay className='cursor-pointer' value={item.price} />
                                            </Box>
                                            <Typography className={'ml-2 font-bold' + (item.stock === 0 ? " text-red-500" : "")}>
                                                Stock: <span className='mx-5'>{item.stock}</span>
                                                {item.stock <= MIN_STOCK_WARNING && item.stock > 0 && <FontAwesomeIcon icon={faWarning} className='text-yellow-500 ml-2' />}
                                                {item.stock === 0 && <FontAwesomeIcon icon={faWarning} className='text-red-500 ml-2' />}
                                                {item.stock > MIN_STOCK_WARNING && <span>&nbsp;</span>}
                                            </Typography>
                                        </Box>
                                </Tooltip>

                                
                                <Box className="m-0 p-0 text-center">
                                    <Tooltip id={"add-stock-"+index} leaveDelay={0} title="Agregar stock" placement='left'>
                                        <IconButton size='small' className='p-0' onClick={()=>{setItemSelected({
                                            item: item,
                                            productName: params.row.name,
                                            remove: false
                                        }); setStockNumber(0)}}>
                                            <FontAwesomeIcon icon={faCirclePlus} className='text-green-500 px-1' />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip id={"remove-stock-"+index} leaveDelay={0} title="Eliminar stock" placement='right'>
                                        <IconButton disabled={item?.stock<=0} size='small' className='m-0 p-0 text-red-500 disabled:text-slate-400' onClick={()=>{setItemSelected({
                                            item: item,
                                            productName: params.row.name,
                                            remove: true
                                        }); setStockNumber(0)}}>
                                            <FontAwesomeIcon icon={faCircleMinus} className='px-1' />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Stack>
                            
                    )}
                </Stack>)
            }
        },
    ];

    return (<>
        <Dialog open={itemSelected?true:false}>
            <DialogTitle className='p-2 flex items-center justify-between border-b mb-2'>
                <Typography className='mx-2 p-0'>Modificar Stock</Typography>
                <IconButton
                    size='small'
                    className='py-0'
                    aria-label="close"
                    onClick={() => {setItemSelected(null)}}>
                    <FontAwesomeIcon icon={faClose} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography className='text-xs'>{itemSelected?.productName}</Typography>
                <Typography className='text-xs'>SKU: <b>{itemSelected?.item?.sku}</b></Typography>
                <Typography className='text-xs'>Stock actual: <b>{itemSelected?.item?.stock}</b></Typography>
                <TextField
                    autoComplete='off'
                    label={itemSelected?.remove?"Eliminar Stock":"Agregar Stock"}
                    type="number"
                    className='mt-4'
                    value={stockNumber}
                    onChange={(e) => {setStockNumber(parseInt(e.target.value))}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        inputProps: {
                            min: 0
                        }
                    }}
                />
            </DialogContent>
            <DialogActions className='flex items-center justify-center'>
                {itemSelected?.remove?
                    <Button onClick={()=>{removeStock(itemSelected.item.id, stockNumber);}} startIcon={<FontAwesomeIcon icon={faPlus}/>} disabled={stockNumber<=0 || loading} variant='contained' className='bg-red-700 disabled:bg-slate-200'>Eliminar Stock</Button>
                :
                    <Button onClick={()=>{addStock(itemSelected?.item?.id!, stockNumber);}} startIcon={<FontAwesomeIcon icon={faPlus}/>} disabled={stockNumber<=0 || loading} variant='contained' className='bg-green-700 disabled:bg-slate-200'>Agregar Stock</Button>
                }
            </DialogActions>
        </Dialog>

        <MuiDataGrid loading={loading} columns={columns} rows={rows} rowCount={rowCount} editPath={editPath} deletePath={deletePath} />
    </>)
}

export default ProductDataGrid