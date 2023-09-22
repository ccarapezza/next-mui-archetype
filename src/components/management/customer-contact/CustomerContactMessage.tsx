"use client"

import { faCalendarDays, faClock, faEnvelope, faFileCircleQuestion, faPhone, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';

export default function CustomerContactMessage({ customerContact, }: { customerContact: any }) {

    function formatDate(dateString: Date) {
        const fecha = new Date(dateString);

        const dia = fecha.getDate();
        const mes = fecha.toLocaleDateString('es-ES', { month: 'long' });
        const año = fecha.getFullYear();
        const hora = fecha.getHours();
        const minutos = fecha.getMinutes().toString().padStart(2, '0');

        const fechaFormateada = `${dia}, ${mes} de ${año}`;
        const horaFormateada = `${hora}:${minutos}`;

        return {
            fecha: fechaFormateada,
            hora: horaFormateada
        };
    }

    function overdueAnswer(dateString: Date) {
        const date = new Date(dateString);
        const today = new Date();
        const diff = today.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days >= 1) {
            return true;
        }
        return false;
    }

    return (
        <>
            <div className="flex justify-between pt-3 ml-4 mr-4 mb-2">
                <div>
                    <Typography className='uppercase font-bold mb-2'>{customerContact.name + ' ' + customerContact.lastname}</Typography>
                    <Typography className='text-gray-400 text-sm mb-2'><FontAwesomeIcon icon={faEnvelope} className='mr-2' />{customerContact.email}</Typography>
                    <Typography className='text-gray-400 text-sm mb-2'><FontAwesomeIcon icon={faPhone} className='mr-2' />{customerContact.phone}</Typography>
                </div>

                <div className='flex flex-col items-end'>
                    <div className='flex items-center mb-2'>
                        {
                            customerContact.status?.id == 1 && overdueAnswer(customerContact.createdAt) ?
                                <FontAwesomeIcon icon={faTriangleExclamation} className="h-5 w-5 text-yellow-500 mr-2" />
                                :
                                <></>
                        }

                        <span className={`px-3 py-2 rounded-full font-semibold text-xs ${customerContact.status?.id == 1 ? "text-red-600 bg-red-50" : customerContact.status?.id == 2 ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                            {customerContact?.status?.name}
                            <p>{overdueAnswer(customerContact.createdAt)}</p>
                        </span>
                    </div>
                    <Typography className='text-gray-400 text-sm mb-2'><FontAwesomeIcon icon={faCalendarDays} className='mr-2' />{formatDate(customerContact.createdAt).fecha}</Typography>
                    <Typography className='text-gray-400 text-sm mb-2'><FontAwesomeIcon icon={faClock} className='mr-2' />{formatDate(customerContact.createdAt).hora}hs</Typography>
                </div>
            </div>
            <div className="mx-4 pt-4 border-t">
                <div className="block text-gray-900 text-sm py-2 mb-4 bg-gray-50 p-5 rounded-md">
                    <Typography className='text-gray-400 text-sm mb-2'><FontAwesomeIcon icon={faUser} className='mr-2' />{customerContact.name}</Typography>
                    <p className="text-gray-900 text-sm">{customerContact.message}</p>
                </div>
                {
                    customerContact.answer && customerContact.status?.id == 2 ?
                        <div className="block text-gray-900 text-sm py-2 mb-4 bg-gray-50 p-5 rounded-md">
                            <Typography className='text-gray-400 text-sm mb-2'><FontAwesomeIcon icon={faUser} className='mr-2' />{customerContact.owner}</Typography>
                            <p className="text-gray-900 text-sm">{customerContact.answer}</p>
                        </div>
                        :
                        <></>
                }
            </div>
        </>

    );
}