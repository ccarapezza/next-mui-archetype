import MuiBox from '@/components/client/MuiBox'
import PageHeader from '@/components/management/paperbase/PageHeader'
import ReactEmailEditor from '@/components/client/ReactEmailEditor'
import { headers } from "next/headers";
import { emailTemplateService } from '@/services/EmailTemplateService';

const fetchEmailTemplateData = async (id: number) => {
    return await emailTemplateService.getById(id);
};

export default async function EmailTemplatesPage({ params }: { params: { id: number } }) {
    const data = await fetchEmailTemplateData(params.id);

    return (<>
        <PageHeader title="Edit Template" />
        <MuiBox className="py-2 px-4">
            <ReactEmailEditor id={params.id} name={data.name} template={data.template.toString()} />
        </MuiBox>
    </>)
}