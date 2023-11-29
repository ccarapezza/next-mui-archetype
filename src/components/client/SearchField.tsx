"use client"
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, IconButton, TextField } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef } from 'react'

function SearchField(props: any) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()!;
    const searchRef = useRef<HTMLInputElement>();

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const executeSearch = () => {
        router.push(pathname + (searchRef.current?.value ?'?' + createQueryString('search', searchRef.current?.value || '') : ""))
    }

    useEffect(() => {
        if (searchParams.has('search')) {
            const searchTerm = searchParams.get('search');
            if(searchRef != undefined && searchRef.current != undefined && searchTerm != undefined)
                searchRef.current.value = searchTerm;
        }
    }, [searchParams])
    

    return (<Box className="flex items-stretch">
        <TextField  size='small' placeholder='Search...' InputProps={{ className: "rounded-none rounded-l border-red-500" }} inputRef={searchRef}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                executeSearch();
            }
        }
        } />
        <Button size='small' variant='outlined' className='rounded-none rounded-r border-l-0 border-slate-400'
            onClick={() => {
                executeSearch();
              }}>
            <FontAwesomeIcon icon={faSearch} className='text-slate-400' />
        </Button>
    </Box>)
}

export default SearchField