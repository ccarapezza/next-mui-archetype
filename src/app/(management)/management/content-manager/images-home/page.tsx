import { IMAGE_CONTAINER_CODES } from '@/app/api/management/content-manager/image-container/upload-image-container/route'
import HomeImageBlock from '@/components/main-ui/HomeImageBlock'
import ImageContainerControl from '@/components/management/content-manager/ImageContainerControl'
import PageHeader from '@/components/management/paperbase/PageHeader'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Typography } from '@mui/material'
import React from 'react'

export default function ImagesHomePage() {
  return (<>
    <PageHeader title="Images Home" />
    <Box className="p-4 border rounded">
        <Box className="flex gap-2">
            <ImageContainerControl code={IMAGE_CONTAINER_CODES.HOME_IMAGE_1} size={{width: 800, height: 800}} compressedSizeOnKb={150} name={'home-image-1'}/>
            <ImageContainerControl code={IMAGE_CONTAINER_CODES.HOME_IMAGE_2} size={{width: 800, height: 800}} compressedSizeOnKb={150} name={'home-image-2'}/>
            <ImageContainerControl code={IMAGE_CONTAINER_CODES.HOME_IMAGE_3} size={{width: 800, height: 800}} compressedSizeOnKb={150} name={'home-image-3'}/>
        </Box>
        <Typography variant="h6" className='m-6'><FontAwesomeIcon icon={faEye} className='mr-2'/>Vista previa del slider</Typography>
        <Box className="max-w-screen-xl m-auto">
            <HomeImageBlock/>
        </Box>
    </Box>
  </>)
}
