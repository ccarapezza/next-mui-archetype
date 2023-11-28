import { IMAGE_CONTAINER_CODES } from '@/utils/Constants';
import HomeImageBlock from '@/components/main-ui/HomeImageBlock'
import ImageContainerControl from '@/components/management/content-manager/ImageContainerControl'
import PageHeader from '@/components/management/paperbase/PageHeader'
import { faEye, faImage, faPhotoFilm, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Box, Chip, Divider, Typography } from '@mui/material'
import React from 'react'

export default function ImagesHomePage() {
  return (<>
    <PageHeader title="Imágenes Portada" icon={faPhotoFilm}/>
    <Box className="p-4 border rounded">
        <Alert severity="info">Asigne las imagenes que se mostrarán en el Home. La resolución para Desktop y dispositivos móviles es de <span className='font-bold'>800x800</span></Alert>
        <Divider className='mt-4'>
            <Chip label={
                <Typography className='text-sm uppercase'><FontAwesomeIcon icon={faEye} className='mr-2' />Vista previa del Home</Typography>
            } variant="outlined" />
        </Divider>
        <Box className="max-w-screen-xl m-auto mt-4">
            <HomeImageBlock/>
        </Box>
        <Divider className='mt-4 mb-4'>
            <Chip label={
                <Typography className='text-sm uppercase'><FontAwesomeIcon icon={faUpload} className='mr-2'/><FontAwesomeIcon icon={faImage} className='mr-2'/>Carga de imagenes</Typography>
            } variant="outlined" />
        </Divider>
        <Box className="flex gap-2 justify-center">
            <ImageContainerControl code={IMAGE_CONTAINER_CODES.HOME_IMAGE_1} size={{width: 800, height: 800}} compressedSizeOnKb={150} name={'home-image-1'}/>
            <ImageContainerControl code={IMAGE_CONTAINER_CODES.HOME_IMAGE_2} size={{width: 800, height: 800}} compressedSizeOnKb={150} name={'home-image-2'}/>
            <ImageContainerControl code={IMAGE_CONTAINER_CODES.HOME_IMAGE_3} size={{width: 800, height: 800}} compressedSizeOnKb={150} name={'home-image-3'}/>
        </Box>
    </Box>
  </>)
}

export const dynamic = 'force-dynamic';