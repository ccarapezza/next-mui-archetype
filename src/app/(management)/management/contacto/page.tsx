import MuiBox from '@/components/client/MuiBox'
import CustomerContactLit from '@/components/management/customer-contact/CustomerContactList';
import PageHeader from '@/components/management/paperbase/PageHeader'
import { customerContactStatus } from '@/services/CustomerContactService';
import { GridColDef } from '@mui/x-data-grid';

const fetchCustomerContact = async () => {
    return await customerContactStatus.getAllCustomerContactDto();
  };
  

export default async function CustomerContactPage() {

    const customerContactListDto = await fetchCustomerContact();

    console.log(customerContactListDto);
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Consulta Nº',
            flex: 1
        },
        {
            field: 'name',
            headerName: 'Nombre',
            flex: 1
        },
        {
            field: 'lastname',
            headerName: 'Apellido',
            flex: 1
        },
        {
            field: 'phone',
            headerName: 'Teléfono',
            flex: 1
        },
        {
            field: 'message',
            headerName: 'Mensaje',
            flex: 1
        },
        {
            field: "statusId",
            headerName: "Estatus",
            flex: 1
        }
    ];
    
    return (<>
        <PageHeader title="Formulario de contacto" />
        <MuiBox className="p-10">
            <CustomerContactLit columns={columns} rows={customerContactListDto} />
        </MuiBox>
    </>)
}
