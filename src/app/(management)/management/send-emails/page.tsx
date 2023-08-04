import MuiBox from '@/components/client/MuiBox'
import MuiGrid from '@/components/client/MuiGrid'
import SendEmailsPage from '@/components/management/email/SendEmailsPage'
import SubscribersCard from '@/components/management/email/SubscribersCard'
import TemplateList from '@/components/management/email/TemplateList'
import TemplatePreview from '@/components/management/email/TemplatePreview'
import TestEmailCard from '@/components/management/email/TestEmailCard'
import PageHeader from '@/components/management/paperbase/PageHeader'
import { headers } from 'next/headers'
import React from 'react'

const fetchEmailTemplatesData = async (page: number, size: number, search: string) => {
    const querySearch = search?`?search=${search}`:"";
    const res = await fetch(`http://localhost:3000/api/management/email-template/list/${page}/${size}${querySearch}`, {
        cache: 'no-store',
        headers: headers()
    });
    return res.json();
};

export default async function () {
    const emailTemplates: TemplateDto[] = (await fetchEmailTemplatesData(1, 5, ""))?.rows;
    return (<>
        <PageHeader title="Send Emails" />
        <MuiBox className="p-10 max-w-6xl mx-auto">
            <MuiGrid container spacing={2}>
                <MuiGrid item xs={12}>
                    <SendEmailsPage emailTemplates={emailTemplates} />
                </MuiGrid>
            </MuiGrid>
        </MuiBox>
    </>)
}
