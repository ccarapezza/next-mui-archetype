import CustomerContactMessage from "./CustomerContactMessage"
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Button, TextField } from "@mui/material"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPaperPlane, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { enqueueSnackbar } from "notistack";
import { CustomerContactDto } from "@/schemas/customerContact";
import { DialogContext } from "../context/DialogContext";
import { useContext } from "react";
interface IAnswerForm {
    answer: string
}

const schema = yup.object({
    answer: yup.string().min(3).max(300).required()
}).required();

export default function CustomerContactResponder({ openModalstate, setOpenModalState, customerContact, emailFrom }: { openModalstate: boolean, setOpenModalState: any, customerContact: any, emailFrom: string }) {    
    
    const router = useRouter();
    const { showMessage } = useContext(DialogContext);

    const { register, handleSubmit, reset, setValue, formState: { errors, isValid } } = useForm<IAnswerForm>({
        resolver: yupResolver(schema)
    });

    // Update Status
    const updateStatusData = async (customerContact: CustomerContactDto) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/customer-contact/${customerContact.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerContact)
        });
        return res.json();
    };

    const onSubmit = async (data: any) => {
        const editStatus = {
            ...customerContact,
            answer: data.answer,
            statusId: 2,
        }
        updateStatusData(editStatus).then((response) => {
            showMessage(`Respuesta enviada a: ${customerContact.email}`, `En caso de respuesta del cliente esta consulta continuara su curso a través de ${emailFrom}`);
            enqueueSnackbar('Mensaje contestado con éxito!', { variant: 'success' });
            router.refresh();
        }).catch((error) => {
            console.log("error", error);
            enqueueSnackbar('No se pudo contestar el mensaje!', { variant: 'error' });
        }).finally(() => {
            reset({ answer: '' });
            setOpenModalState(false)
        });
    };


    return (
        openModalstate ? (
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setOpenModalState(false)}></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-2xl p-4 mx-auto bg-white rounded-md shadow-lg">
                        <CustomerContactMessage customerContact={customerContact} />
                        {
                            customerContact.statusId === 1 ?
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="pt-3 ml-4 mr-4 mb-2">

                                        <TextField
                                            {...register("answer")}
                                            id="answer"
                                            label="Respuesta"
                                            size='small'
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={6}
                                            className="mb-3"
                                        />

                                    </div>
                                    <div className="items-center gap-2 mt-2 flex justify-end">
                                        <Button type='submit' startIcon={<FontAwesomeIcon icon={faClose} />} variant="outlined" color="error"
                                            onClick={() => setOpenModalState(false)}
                                        >
                                            Salir
                                        </Button>
                                        <Button type='submit' startIcon={<FontAwesomeIcon icon={faPaperPlane} />} variant="outlined" color="primary">
                                            Enviar Respuesta
                                        </Button>
                                    </div>
                                </form>
                                :
                                <div className="items-center gap-2 mt-2 flex justify-end">
                                    <Button type='submit' startIcon={<FontAwesomeIcon icon={faClose} />} variant="outlined" color="error"
                                        onClick={() => setOpenModalState(false)}
                                    >
                                        Salir
                                    </Button>
                                </div>
                        }

                    </div>
                </div>
            </div>
        ) : ''
    )
}