"use client"
import { ReactNode, useCallback, useContext } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowHeightParams, GridRowHeightReturnValue } from '@mui/x-data-grid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconButton, Stack, Switch, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DialogContext } from '../management/context/DialogContext';
import { useSnackbar } from 'notistack';

export default function MuiDataGrid({ columns, rows, rowCount, editPath, switcherPath, deletePath, customActions, loading, getRowHeight }: { columns: GridColDef[], rows: any[], rowCount: number, editPath?: string, switcherPath?: string, deletePath?: string, customActions?: CustomAction[], loading?: boolean, getRowHeight?: (params: GridRowHeightParams) => GridRowHeightReturnValue }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { enqueueSnackbar } = useSnackbar();

    const { showConfirm, showMessage } = useContext(DialogContext);

    const createQueryString = useCallback(
        (params: Array<{ name: string, value: string }>) => {
            const urlParams = new URLSearchParams(searchParams.toString())
            for (const { name, value } of params) {
                urlParams.set(name, value)
            }
            return urlParams.toString()
        },
        [searchParams]
    )

    const fetchDelete = async (id: string) => {
        const res = await fetch(deletePath + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return res.ok;
    }

    const fetchSwitcher = async (id: string, dataSwitcher: any) => {
        const res = await fetch(switcherPath + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSwitcher)
        });
        return res.json();
    }

    const onPaginationModelChange = (paginationModel: any) => {
        router.replace(pathname + '?' + createQueryString([
            { name: 'page', value: paginationModel.page + 1 },
            { name: 'size', value: paginationModel.pageSize }
        ]))
    };

    const onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: any) => {
        e.stopPropagation();
        router.replace(editPath + '/' + row.id);
    };

    const onSwitcher = (e: React.ChangeEvent<HTMLInputElement>, row: any) => {
        fetchSwitcher(row.id, {active: e.target.checked}).then((ok) => {
            if (ok) {
                enqueueSnackbar('Item updated', { variant: 'success' });
                router.refresh();
            }
        });
    };

    const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: any) => {
        e.stopPropagation();
        showConfirm("Confirmar eliminación", "Estás seguro que deseas eliminar el item?", () => {
            fetchDelete(row.id).then((ok) => {
                if (ok) {
                    enqueueSnackbar('Item deleted', { variant: 'success' });
                    router.refresh();
                }
            });
        },
            () => { });
    };

    const getColumns = () => {
        let finalColumns = [...columns];
        if (editPath || deletePath || switcherPath) {
            finalColumns.push({
                field: 'actions', headerName: 'Acciones', flex: .75, align: 'center', headerAlign: 'center', sortable: false,
                renderCell: (params) => {
                    return (<>
                        {
                            customActions?.map((customAction, index) =>
                            customAction.show(params.row)?
                                <Tooltip key={`custom-action-${index}`} title={customAction.title}>
                                    <IconButton onClick={(e) => customAction?.action(e, params.row)}>
                                        <FontAwesomeIcon fixedWidth icon={customAction.icon} />
                                    </IconButton>
                                </Tooltip>
                                : null
                            )
                        }
                        {switcherPath &&
                            <Tooltip title="On/Off">
                                <Switch size='small'
                                    checked={params.row.active}
                                    onChange={(e) => onSwitcher(e, params.row)}
                                />
                            </Tooltip>
                        }
                        {editPath &&
                            <Tooltip title="Editar">
                                <IconButton size='small' onClick={(e) => onEdit(e, params.row)}>
                                    <FontAwesomeIcon fixedWidth icon={faEdit} />
                                </IconButton>
                            </Tooltip>
                        }
                        {deletePath &&
                            <Tooltip title="Eliminar">
                                <IconButton size='small' onClick={(e) => onDelete(e, params.row)}>
                                    <FontAwesomeIcon fixedWidth icon={faTrash} />
                                </IconButton>
                            </Tooltip>
                        }
                    </>);
                }
            });
        }
        return finalColumns;
    }

    return (
        <Box>
            {rows.length === 0 ? <div className="flex justify-center items-center h-40">No hay datos disponibles</div>
                :
                <DataGrid
                    loading={loading}
                    rows={rows}
                    columns={getColumns()}
                    rowCount={rowCount}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    getRowHeight={getRowHeight}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    paginationMode='server'
                    onPaginationModelChange={onPaginationModelChange}
                />
            }
        </Box>
    );
}