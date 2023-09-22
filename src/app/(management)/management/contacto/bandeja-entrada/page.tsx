import MuiBox from '@/components/client/MuiBox'
import CustomerContactLit from '@/components/management/customer-contact/CustomerContactList';
import PageHeader from '@/components/management/paperbase/PageHeader'
import { customerContactStatus } from '@/services/CustomerContactService';
import { GridColDef } from '@mui/x-data-grid';

const fetchCustomerContact = async (search: string, page: number, size: number, statusId: number ) => {
    return await customerContactStatus.search(search, page, size, statusId);
};


export default async function CustomerContactPage({ searchParams }: { searchParams: { search: string, page: number, size: number } }) {
    const getPaginationParams = () => {
        return {
            page: searchParams.page ? searchParams.page : 1,
            size: searchParams.size ? searchParams.size : 5
        }
    }
    const paginationParams = getPaginationParams();
    const customerContactListDto = await fetchCustomerContact(searchParams.search, paginationParams.page, paginationParams.size, 1);

    const {rows, totalPages, currentPage, totalItems} = customerContactListDto;
    return (<>
        <PageHeader title="Formulario de contacto" />
        <MuiBox className="pb-10 pt-5">
            <CustomerContactLit customerContactListDto={rows} totalPages={totalPages} currentPage={currentPage} totalItems={totalItems}/>
        </MuiBox>
    </>)
}

export const dynamic = 'force-dynamic';