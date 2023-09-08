"use client"
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, TextField } from '@mui/material';
import MuiBox from '@/components/client/MuiBox';
import LoadingBlocker from '@/components/client/LoadingBlocker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useSnackbar } from 'notistack';

interface IFaqForm {
    ask: string
    answer: string
}

interface IFaqSelected {
    id: number
    ask: string
    answer: string
}

const schema = yup.object({
    ask: yup.string().min(3).max(200).required(),
    answer: yup.string().min(3).max(800).required()
}).required();


export default function FaqCreate({ faqData, faqSelected, setIdAskSelected }: { faqData: any, faqSelected: IFaqSelected | undefined, setIdAskSelected: (id: number | null) => void }) {
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const { register, handleSubmit, reset, setValue, formState: { errors, isValid } } = useForm<IFaqForm>({
        resolver: yupResolver(schema)
    });

    // Set data to edit
    useEffect(() => {
        if (faqSelected !== undefined && faqSelected.id) {
            setValue('ask', faqSelected.ask);
            setValue('answer', faqSelected.answer);
            setIsEdit(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [faqSelected]);

    const urlFaqData = isEdit ?
        `/api/management/content-manager/faq-editor/${faqSelected?.id}` :
        `/api/management/content-manager/faq-editor`;

    // Create or Update Faq
    const saveFaqData = async (faqData: any) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT + urlFaqData}`, {
            method: isEdit ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(faqData)
        });
        return res.json();
    };


    const onSubmit = async (data: IFaqForm) => {
        saveFaqData(data).then((response) => {
            enqueueSnackbar('Pregunta guardada correctamente', { variant: 'success' });
            router.refresh();
            setLoading(false);
            setIsEdit(false);
            setIdAskSelected(null);
        }).catch((error) => {
            console.log("error", error);
            enqueueSnackbar('Error al guardar la pregunta', { variant: 'error' });
            setLoading(false);
        }).finally(() => {
            reset({ ask: '', answer: '' });
            setLoading(false);
        });
    };

    return (
        <>
            {loading &&
                <LoadingBlocker />
            }
            <div className="max-w-screen-xl mx-auto bg-white p-4 rounded-md shadow-lg">
                <MuiBox className="flex flex-col px-2 pt-2 flex justify-center">
                    <h1 className="text-xl font-semibold mb-4">{
                        isEdit ? 'Editar Pregunta' : 'Crear Pregunta'
                    }</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container marginTop={2} paddingTop={0} gap={2}>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("ask")}
                                    id="ask"
                                    label="Pregunta"
                                    type="text"
                                    size='small'
                                    fullWidth
                                    defaultValue={faqData?.ask}
                                    error={!!errors.ask}
                                    className="mb-3"
                                />
                                <TextField
                                    {...register("answer")}
                                    id="answer"
                                    label="Respuesta"
                                    size='small'
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    defaultValue={faqData?.answer}
                                    error={!!errors.answer}
                                    className="mb-3"
                                />
                            </Grid>
                            <Grid item xs={12} className='flex flex-row justify-end items-center gap-2'>
                                {
                                    isEdit ?
                                        <Button type='button' variant="contained" color="error" onClick={() => {
                                            reset({ ask: '', answer: '' });
                                            setIsEdit(false);
                                            setIdAskSelected(null);
                                        }
                                        }>
                                            Cancelar
                                        </Button>
                                        :
                                        null
                                }
                                <Button type='submit' startIcon={<FontAwesomeIcon icon={faSave} />} variant="contained" color="primary" disabled={!isValid}>
                                    {
                                        isEdit ? 'Actualizar' : 'Guardar'
                                    }
                                </Button>

                            </Grid>
                        </Grid>
                    </form>
                </MuiBox>
            </div>
        </>
    )
}
