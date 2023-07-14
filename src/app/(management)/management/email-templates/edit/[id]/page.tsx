import MuiBox from '@/components/client/MuiBox'
import PageHeader from '@/components/management/paperbase/PageHeader'
import ReactEmailEditor from '@/components/client/ReactEmailEditor'
import { headers } from "next/headers";

const fetchEmailTemplateData = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/management/email-template/${id}`, {
        cache: 'no-store',
        headers: headers()
    } );
    return res.json();
};

export default async function ({ params }: { params: { id: number } }) {
    const data = await fetchEmailTemplateData(params.id);

    return (<>
        <PageHeader title="Edit Template" />
        <MuiBox className="py-2 px-4">
            <ReactEmailEditor id={params.id} name={data.name} template={data.template} />
        </MuiBox>
    </>)
}