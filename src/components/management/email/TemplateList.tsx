'use client'
import { faDraftingCompass, faPaintBrush, faPalette } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

function TemplateList() {
  return (
    <List component="nav" aria-label="main mailbox folders" className='shadow rounded border p-0'>
        <ListItem>
            <ListItemIcon className='p-0 m-0'>
                <FontAwesomeIcon icon={faPalette} />
            </ListItemIcon>
            <ListItemText primary="Templates" className='font-bold'/>
        </ListItem>
        <Divider/>
        <ListItemButton onClick={(event) => () => { }} >
            <ListItemText primary="Drafts" />
        </ListItemButton>
        <ListItemButton onClick={(event) => () => { }}>
            <ListItemText primary="Drafts" />
        </ListItemButton>
    </List>
  )
}

export default TemplateList