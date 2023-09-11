"use client"
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import { IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { enqueueSnackbar } from 'notistack';
import { DialogContext } from '../../context/DialogContext';

export default function FaqListEdit({ columns, rows, setIdAskSelected }: { columns: GridColDef[], rows: any[], setIdAskSelected: (id: number) => void }) {

    const router = useRouter();
    const { showConfirm } = useContext(DialogContext);

    const onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: any) => {
        setIdAskSelected(row.id)
    };

    const fetchDelete = async (id: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/content-manager/faq-editor/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return res.ok;
    }

    const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: any) => {
        e.stopPropagation();
        showConfirm("Eliminar pregunta", "¿Desea eliminar la pregunta?", () => {
            fetchDelete(row.id).then((ok) => {
                if (ok) {
                    enqueueSnackbar('Pregunta eliminada con éxito!', { variant: 'success' });
                    router.refresh();
                }
            }
            ).catch((error) => {
                enqueueSnackbar('No se pudo eliminar la pregunta!', { variant: 'error' });
            }
            );
        },
            () => { });
    };

    const getColumns = () => {
        let finalColumns = [...columns];
        finalColumns.push({
            field: 'actions', headerName: 'Editar / Borrar', flex: .75, align: 'center', headerAlign: 'center', sortable: false,
            renderCell: (params) => {
                return (<>
                    <Tooltip title="Edit">
                        <IconButton size='small' onClick={(e) => onEdit(e, params.row)}>
                            <FontAwesomeIcon fixedWidth icon={faEdit} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton size='small' onClick={(e) => onDelete(e, params.row)}>
                            <FontAwesomeIcon fixedWidth icon={faTrash} />
                        </IconButton>
                    </Tooltip>
                </>);
            }
        });
        return finalColumns;
    }

    return (
        <Box>
            {rows.length === 0 ? <div className="flex justify-center items-center h-40 max-w-screen-xl">No tienes preguntas frecuentes</div>
                :
                <DataGrid
                    rows={rows}
                    columns={getColumns()}
                    rowCount={rows.length}
                    disableRowSelectionOnClick
                />
            }
        </Box>
    );
}