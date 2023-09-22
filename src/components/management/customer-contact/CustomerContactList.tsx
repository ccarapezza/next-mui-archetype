"use client"

import { CustomerContactDto } from '@/schemas/customerContact';
import { faEye, faPaperPlane, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Button } from '@mui/material';
import { useContext, useState } from 'react';
import CustomerContactResponder from './CustomerContactResponder';
import CustomerContactMessage from './CustomerContactMessage';
import { DialogContext } from '../context/DialogContext';
import { enqueueSnackbar } from 'notistack';
import { usePathname, useRouter } from 'next/navigation';
import PrettyPagination from '@/components/general/PrettyPagination';

export default function CustomerContactLit({ customerContactListDto, totalPages, currentPage, totalItems }: { customerContactListDto: CustomerContactDto[], totalPages: number, currentPage: number, totalItems: number }) {

    const { showConfirm } = useContext(DialogContext);
    const router = useRouter();
    const pathname = usePathname();

    // Modal State
    const [openModalstate, setOpenModalState] = useState(false)
    const [customerContact, setCustomerContact] = useState<CustomerContactDto | null>(null)
    const [whatPageState, setWhatPageState] = useState(pathname)

    const handleOpenModal = (id: number) => {
        const customerContact = customerContactListDto.find((customerContact) => customerContact.id === id)
        setCustomerContact(customerContact!)
        setOpenModalState(true)
    }

    // Delete
    const fetchDelete = async (id: number) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/customer-contact/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return res.ok;
    }


    const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        e.stopPropagation();
        showConfirm("Eliminar Mensaje", "¿Desea eliminar el mensaje?", () => {
            fetchDelete(id).then((ok) => {
                if (ok) {
                    enqueueSnackbar('Mensaje eliminado con éxito!', { variant: 'success' });
                    router.refresh();
                }
            }
            ).catch((error) => {
                enqueueSnackbar('No se pudo eliminar el mensaje!', { variant: 'error' });
            }
            );
        },
            () => { });
    };

    //Total backlog of questions and alert!
    function getOverdueAnswer(params: any) {
        let totalOverdueAnswer = 0;
        params?.forEach((customerContact: any) => {
            const date = new Date(customerContact.createdAt);
            const today = new Date();
            const diff = today.getTime() - date.getTime();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            if (days >= 1 && customerContact.status.id === 1) {
                totalOverdueAnswer++;
            }
        })
        if (totalOverdueAnswer > 0) {
            return (
                <Alert severity="warning">
                    {
                        totalOverdueAnswer === 1 ?
                            <p>¡Tienes {totalOverdueAnswer} mensaje atrasado!</p>
                            :
                            <p>¡Tienes {totalOverdueAnswer} mensajes sin atrasados!</p>
                    }
                </Alert>
            );
        } else {
            <></>
        }
    }

    return (
        <>
            {
                totalItems === 0 &&
                <div className="flex justify-center items-center h-40">No tienes mensajes</div>
            }
            <section className="mt-8 mx-auto px-4 max-w-screen-xl md:px-4">
                {totalItems > 0 &&
                    <div>
                        <Alert severity="info" className='mb-2'>
                            {totalItems === 1 ?
                                    <p>¡Tienes {totalItems} {whatPageState === '/management/contacto/bandeja-entrada' ?
                                        'mensaje nuevo!' : 'mensaje guardado!'}</p>
                                    :
                                    <p>¡Tienes {totalItems} {whatPageState === '/management/contacto/bandeja-entrada' ?
                                            'mensajes nuevos!' : 'mensajes guardados!'
                                    }</p>
                            }
                        </Alert>
                        {getOverdueAnswer(customerContactListDto)}
                    </div>
                }
                <div className="mt-12">
                    {
                        customerContactListDto.map((items, key) => (
                            <article className="p-4 mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm" key={key}>
                                <CustomerContactMessage customerContact={items} />
                                <div className='flex justify-end'>
                                    <Button type='submit' startIcon={<FontAwesomeIcon icon={faTrashCan} />} variant="outlined" color="error" className='mr-4'
                                        onClick={(e) => onDelete(e, items.id)}
                                    >
                                        Descartar
                                    </Button>
                                    {
                                        items.status.id === 1 ?
                                            <Button type='submit' startIcon={<FontAwesomeIcon icon={faPaperPlane} />} variant="outlined" color="primary"
                                                onClick={() => handleOpenModal(items.id)}
                                                disabled={items.status.id !== 1}
                                            >
                                                Responder
                                            </Button>
                                            :
                                            <Button type='submit' startIcon={<FontAwesomeIcon icon={faEye} />} variant="outlined" color="primary"
                                                onClick={() => handleOpenModal(items.id)}
                                            >
                                                Ver
                                            </Button>
                                    }
                                </div>
                            </article>
                        ))
                    }
                </div>
                <PrettyPagination totalPages={totalPages} currentPage={currentPage} totalItems={totalItems} />
            </section>
            <CustomerContactResponder openModalstate={openModalstate} setOpenModalState={setOpenModalState} customerContact={customerContact} />
        </>

    );
}