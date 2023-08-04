"use client"
import React, { useState } from 'react'
import TemplateList from './TemplateList'
import TestEmailCard from './TestEmailCard'
import SubscribersCard from './SubscribersCard'

export default function SendEmailsPage({ emailTemplates }: { emailTemplates: TemplateDto[] }) {
    const [htmlContentSelected, setHtmlContentSelected] = useState<string>("");

    return (<>
        <TemplateList templates={emailTemplates} onTemplateSelected={(htmlContent: string)=>{
            setHtmlContentSelected(htmlContent);
        }}/>
        <TestEmailCard htmlContent={htmlContentSelected}/>
        <SubscribersCard count={5} />
    </>)
}
