'use client'
import createQueryString from '@/utils/RouterUtil'
import { faEye, faPalette } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import TemplatePreview from './TemplatePreview'

function TemplateList({ templates }: { templates: TemplateDto[] }) {
    console.log("templates", templates)
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [templatePreview, setTemplatePreview] = useState<TemplateDto|null>(null);

    const selectedTemplate = (templateId: string) => {
        setTemplatePreview(null);
        router.push(pathname + '?' + createQueryString(
            [{
                name: 'templateId',
                value: templateId
            }],
            searchParams.toString())
        )
    }

    return (<>
        <List component="nav" aria-label="main mailbox folders" className='shadow rounded border p-0'>
            <ListItem>
                <ListItemIcon className='p-0 m-0'>
                    <FontAwesomeIcon icon={faPalette} />
                </ListItemIcon>
                <ListItemText primary="Templates" className='font-bold' />
            </ListItem>
            <Divider />
            {templates?.map((template) => (
                
                <ListItemButton key={template.id} selected={searchParams.get('templateId') === template.id.toString()} onClick={(event) => { event.stopPropagation(); selectedTemplate(template.id.toString()) }} >
                    <ListItemText primary={template.name} />
                    {searchParams.get('templateId') === template.id.toString() && templatePreview === null &&
                        <ListItemIcon onClick={(event) => { event.stopPropagation(); setTemplatePreview(template) }} className='border p-1 rounded shadow'>
                            <Typography>Show Preview <FontAwesomeIcon icon={faEye} /></Typography>
                        </ListItemIcon>
                    }
                </ListItemButton>
                

            ))}
        </List>
        { templatePreview &&
            <TemplatePreview template={templatePreview!} onClose={()=>{setTemplatePreview(null)}}/>
        }
    </>)
}

export default TemplateList