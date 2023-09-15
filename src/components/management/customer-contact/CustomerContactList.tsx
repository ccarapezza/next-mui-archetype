"use client"
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import { IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function CustomerContactLit({ columns, rows }: { columns: GridColDef[], rows: any[] }) {


    const getColumns = () => {
        let finalColumns = [...columns];
        finalColumns.push({
            field: 'actions', headerName: 'Editar / Borrar', flex: .75, align: 'center', headerAlign: 'center', sortable: false,
            renderCell: (params) => {
                return (<>
                    <Tooltip title="Edit">
                        <IconButton size='small'>
                            <FontAwesomeIcon fixedWidth icon={faEdit} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton size='small'>
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
            {rows.length === 0 ? <div className="flex justify-center items-center">No tienes mensajes de clientes</div>
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