'use client'
import createQueryString from '@/utils/RouterUtil'
import { faEye, faPalette } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import TemplatePreview from './TemplatePreview'

function TemplateList({ templates, onTemplateSelected }: { templates: TemplateDto[], onTemplateSelected: any }) {
    console.log("templates", templates)
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [templatePreview, setTemplatePreview] = useState<TemplateDto|null>(null);
    const [showPreview, setShowPreview] = useState<boolean>(false);

    const selectedTemplate = (template: TemplateDto) => {
        setShowPreview(false);
        setTemplatePreview(template);
        console.log("template", template)
        router.push(pathname + '?' + createQueryString(
            [{
                name: 'templateId',
                value: template.id.toString()
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
                
                <ListItemButton key={template.id} selected={searchParams.get('templateId') === template.id.toString()} onClick={(event) => { event.stopPropagation(); selectedTemplate(template) }} >
                    <ListItemText primary={template.name} />
                    {searchParams.get('templateId') === template.id.toString() && !showPreview &&
                        <ListItemIcon onClick={(event) => { event.stopPropagation(); setShowPreview(true) }} className='border p-1 rounded shadow'>
                            <Typography>Show Preview <FontAwesomeIcon icon={faEye} /></Typography>
                        </ListItemIcon>
                    }
                </ListItemButton>
                

            ))}
        </List>
        <TemplatePreview template={templatePreview!} onClose={()=>{setShowPreview(false)}} show={showPreview} onTemplateHtmlExport={onTemplateSelected}/>
    </>)
}

export default TemplateList