import { Container, Paper, Typography } from '@mui/material'
import React from 'react'

export default function PoliticasPrivacidad() {
    return (
        <Container maxWidth="md" className="mt-6">
            <Paper elevation={3} className="p-4">
                <Typography variant="h5" component="h1" className="mb-4">
                    Política de Privacidad de Cultivo Mis Derechos
                </Typography>

                <Typography variant="subtitle1" className="w-full text-end">
                    Última actualización: 17/10/2023
                </Typography>

                <Typography variant="h5" className="my-4">
                    Introducción
                </Typography>
                <Typography variant="body1" className="my-4">
                    En Cultivo Mis Derechos, respetamos tu privacidad y estamos comprometidos en proteger tus datos personales. Esta Política de Privacidad explica cómo recopilamos, utilizamos y compartimos tu información cuando utilizas nuestra aplicación. Al acceder o utilizar la aplicación, aceptas las prácticas descritas en esta política.
                </Typography>

                <Typography variant="h5" className="mb-8 mt-12">Información que Recopilamos</Typography>
                <Typography variant="h6" className="my-4">Información Personal</Typography>
                <Typography variant="body1" className="my-4">
                    Cultivo Mis Derechos puede recopilar información personal que proporcionas voluntariamente, como tu nombre, dirección de correo electrónico, número de teléfono y otros datos de contacto cuando te registras o interactúas con la aplicación.
                </Typography>

                <Typography variant="h6" className="my-4">Información No Personal</Typography>
                <Typography variant="body1" className="my-4">
                    También recopilamos información no personal, como datos demográficos y patrones de uso, que no te identifican de manera personal. Esto puede incluir información sobre el dispositivo que utilizas, la ubicación aproximada y otros datos de uso anónimos.
                </Typography>

                <Typography variant="h6" className="my-4">Uso de la Información</Typography>
                <Typography variant="body1" className="my-4">
                    Usamos la información que recopilamos para:
                </Typography>
                <ul className='ml-2'>
                    <li>Proporcionar y mantener la funcionalidad de la aplicación.</li>
                    <li>Personalizar tu experiencia dentro de la aplicación.</li>
                    <li>Enviarte comunicaciones relacionadas con la aplicación.</li>
                    <li>Realizar análisis y mejorar nuestros servicios.</li>
                </ul>

                <Typography variant="h6" className="my-4">Compartir Información</Typography>
                <Typography variant="body1" className="my-4">
                    No compartiremos tu información personal con terceros sin tu consentimiento, excepto en las siguientes situaciones:
                </Typography>
                <ul className='ml-2'>
                    <li>Cuando sea necesario para cumplir con una ley o regulación aplicable.</li>
                    <li>Para proteger nuestros derechos, privacidad, seguridad o propiedad, así como los tuyos.</li>
                </ul>

                <Typography variant="h6" className="my-4">
                Seguridad de los Datos
                </Typography>
                <Typography variant="body1" className="my-4">
                    Nos tomamos en serio la seguridad de tus datos y tomamos medidas para protegerlos. Sin embargo, ten en cuenta que ningún sistema de seguridad es completamente infalible.
                </Typography>

                <Typography variant="h6" className="my-4">
                Cambios en la Política de Privacidad
                </Typography>
                <Typography variant="body1" className="my-4">
                    Podemos actualizar esta Política de Privacidad de vez en cuando. Te notificaremos sobre cambios significativos en la política y te recomendamos revisarla periódicamente.
                </Typography>

                <Typography variant="h6" className="my-4">
                Contáctanos
                </Typography>
                <Typography variant="body1">
                    Si tienes preguntas o inquietudes sobre esta Política de Privacidad o la forma en que manejamos tus datos, no dudes en contactarnos en <Typography component="span" className='font-bold'>{process.env.EMAIL_USER}</Typography>
                </Typography>
            </Paper>
        </Container>
    )
}