"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function DataGridDemo({ columns, rows, rowCount, editPath, deletePath }: { columns: GridColDef[], rows: any[], rowCount: number, editPath?: string, deletePath?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = React.useCallback(
    (params: Array<{name: string, value: string}>) => {
      const urlParams = new URLSearchParams(searchParams.toString())
      for (const { name, value } of params){
        urlParams.set(name, value)
      }
      return urlParams.toString()
    },
    [searchParams]
  )

  const onPaginationModelChange = (paginationModel: any) => {
    router.push(pathname + '?' + createQueryString([
      { name: 'page', value: paginationModel.page+1 },
      { name: 'size', value: paginationModel.pageSize }
    ]))
  };

  const onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: any) => {
    e.stopPropagation();
    router.push(editPath + '/' + row.id);
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: any) => {
    e.stopPropagation();
    router.push(deletePath + '/' + row.id);
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
    </Box>
  );
}