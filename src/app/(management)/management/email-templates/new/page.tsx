import MuiBox from '@/components/client/MuiBox'
import PageHeader from '@/components/management/paperbase/PageHeader'
import ReactEmailEditor from '@/components/client/ReactEmailEditor'

export default function () {

    return (<>
        <PageHeader title="New Template" />
        <MuiBox className="py-2 px-4">
            <ReactEmailEditor />
        </MuiBox>
    </>)
}