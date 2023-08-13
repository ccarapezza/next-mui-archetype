import MuiBox from '@/components/client/MuiBox'
import MuiGrid from '@/components/client/MuiGrid'
import SendEmailsComponent from '@/components/management/email/SendEmailsComponent'
import PageHeader from '@/components/management/paperbase/PageHeader'
import { emailTemplateService } from '@/services/EmailTemplateService'
import React from 'react'

const fetchEmailTemplatesData = async (page: number, size: number, search: string) => {
    const data = await emailTemplateService.search(search, page, size);
    //data to EmailTemplateDto
    const emailTemplates: any[] = data.rows.map((item: any) => {
        return item.toJson();
    })
    return {
        rows: emailTemplates,
        totalItems: data.totalItems
    }
};

export default async function SendEmailsPage() {
    const emailTemplates = (await fetchEmailTemplatesData(1, 5, ""))?.rows;
    return (<>
        <PageHeader title="Send Emails" />
        <MuiBox className="p-10 max-w-6xl mx-auto">
            <MuiGrid container spacing={2}>
                <MuiGrid item xs={12}>
                    <SendEmailsComponent emailTemplates={emailTemplates} />
                </MuiGrid>
            </MuiGrid>
        </MuiBox>
    </>)
}