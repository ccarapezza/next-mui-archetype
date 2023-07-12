import MuiBox from '@/components/client/MuiBox'
import PageHeader from '@/components/management/paperbase/PageHeader'
import ReactEmailEditor from '@/components/client/ReactEmailEditor'

export default function () {

    return (<>
        <PageHeader title="Templates" />
        <MuiBox className="p-10">
            <ReactEmailEditor />
        </MuiBox>
    </>)
}
