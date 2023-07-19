"use client"
import { useCallback, useContext } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DialogContext } from '../management/context/DialogContext';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

export default function MuiDataGrid({ columns, rows, rowCount, editPath, deletePath }: { columns: GridColDef[], rows: any[], rowCount: number, editPath?: string, deletePath?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  const { showConfirm, showMessage } = useContext(DialogContext);

  const createQueryString = useCallback(
    (params: Array<{name: string, value: string}>) => {
      const urlParams = new URLSearchParams(searchParams.toString())
      for (const { name, value } of params){
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

  const onPaginationModelChange = (paginationModel: any) => {
    router.replace(pathname + '?' + createQueryString([
      { name: 'page', value: paginationModel.page+1 },
      { name: 'size', value: paginationModel.pageSize }
    ]))
  };

  const onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: any) => {
    e.stopPropagation();
    router.replace(editPath + '/' + row.id);
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: any) => {
    e.stopPropagation();
    showConfirm("Confirm delete", "Are you sure you want to delete this item?", () => {
      fetchDelete(row.id).then((ok) => {
        if(ok){
          enqueueSnackbar('Item deleted', { variant: 'success' });
          router.refresh();
        }
      });
    },
    () => {});
  };

  const getColumns = () => {
    let finalColumns = [...columns];
    if(editPath || deletePath){
      finalColumns.push({ field: 'actions', headerName: 'Actions', width: 400, renderCell: (params) => {
        return (<>
          {editPath&&
            <IconButton onClick={(e) => onEdit(e, params.row)}>
              <FontAwesomeIcon fixedWidth icon={faEdit} />
            </IconButton>
          }
          {deletePath&&
            <IconButton onClick={(e) => onDelete(e, params.row)}>
              <FontAwesomeIcon fixedWidth icon={faTrash} />
            </IconButton>
          }
        </>);
      }});
    }
    return finalColumns;
  }

  return (
    <Box>
      {rows.length === 0 ? <div className="flex justify-center items-center h-40">No data to display</div>
      :
      <DataGrid
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
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        onPaginationModelChange={onPaginationModelChange}
      />
      }
    </Box>
  );
}