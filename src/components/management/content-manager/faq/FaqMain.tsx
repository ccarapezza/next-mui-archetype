'use client'
import { useState } from 'react';
import { Alert, Box, Chip, Divider, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaqListDto } from '@/schemas/faq';
import { faEdit, faEye, faQuestion, faUpload } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '@/components/management/paperbase/PageHeader';
import FaqListManagment from '@/components/management/content-manager/faq/FaqList';
import FaqCreate from '@/components/management/content-manager/faq/FaqCreate';
import FaqListEdit from '@/components/management/content-manager/faq/FaqEdit';


export default function FaqMain(props: { faqListDto: FaqListDto[] }) {

    const { faqListDto } = props;
    const [idAskSelected, setIdAskSelected] = useState<number | null>(null);

    //Get Faq to idAskSelected
    const getFaq = (id: number | null) => {
        return faqListDto.find((faq) => faq.id === id);
    }

    const columns: GridColDef[] = [
        {
            field: 'ask',
            headerName: 'Pregunta',
            flex: 1
        },
        {
            field: 'answer',
            headerName: 'Respuesta',
            flex: 1
        }
    ];

    return (<>
        <PageHeader title="Institucional FAQ" />
        <Box className="m-4">
            <Alert severity="info">Cargue las preguntas frecuentes que se mostraran en su sitio.</Alert>
            <Divider className='mt-4'>
                <Chip label={
                    <Typography variant="h6" className='m-6'><FontAwesomeIcon icon={faEye} className='mr-2' /><FontAwesomeIcon icon={faQuestion} className='mr-2' />Vista Previa Preguntas Frecuentes</Typography>
                } variant="outlined" />
            </Divider>
            <FaqListManagment listFaq={faqListDto} />
            <Divider className='mt-4'>
                <Chip label={
                    <Typography variant="h6" className='m-6'><FontAwesomeIcon icon={faUpload} className='mr-2' /><FontAwesomeIcon icon={faQuestion} className='mr-2' />Crear / Editar</Typography>
                } variant="outlined" />
            </Divider>
            <FaqCreate faqData={{}} faqSelected={getFaq(idAskSelected)} setIdAskSelected={setIdAskSelected} />
            <Divider className='mt-4'>
                <Chip label={
                    <Typography variant="h6" className='m-6'><FontAwesomeIcon icon={faEdit} className='mr-2' /><FontAwesomeIcon icon={faQuestion} className='mr-2' />Listado</Typography>
                } variant="outlined" />
            </Divider>
            <div className='max-w-screen-xl mx-auto bg-white p-4 rounded-md shadow-lg mt-4'>
                <FaqListEdit columns={columns} rows={faqListDto} setIdAskSelected={setIdAskSelected} />
            </div>

        </Box>
    </>)
}