"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function DataGridDemo({ columns, rows, rowCount }: { columns: GridColDef[], rows: any[], rowCount: number }) {
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
      { name: 'page', value: paginationModel.page },
      { name: 'size', value: paginationModel.pageSize }
    ]))
  };

  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={columns}
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