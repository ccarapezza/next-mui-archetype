import MuiBox from '@/components/client/MuiBox'
import TemplateList from '@/components/management/email/TemplateList'
import PageHeader from '@/components/management/paperbase/PageHeader'
import { faDraftingCompass, faInbox } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

export default function () {
    return (<>
        <PageHeader title="Send Emails" />
        <MuiBox className="p-10">
            <TemplateList />
        </MuiBox>
    </>)
}
