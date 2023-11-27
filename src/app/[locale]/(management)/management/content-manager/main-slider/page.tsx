import SliderControlClientPage from './sliderControl';
import { Alert, Box, Chip, Divider, Typography } from '@mui/material';
import MuiBox from '@/components/client/MuiBox';
import CarouselHome from '@/components/store/carousels/CarouselHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faImage, faPanorama, faUpload } from '@fortawesome/free-solid-svg-icons';
import { sliderImageService } from '@/services/SliderImageService';
import PageHeader from '@/components/management/paperbase/PageHeader';

const fetchCarrouselImages = async () => {
    return await sliderImageService.getListOfMainSliderImages();
}

export default async function MainSliderPage() {
    const carrouselImages = await fetchCarrouselImages();
    const filteredImages = carrouselImages.filter((image) => image.visible);
    return (<>
        <PageHeader icon={faPanorama} title="Slider Home" />
        <Box className="m-4">
            <Alert severity="info">Asigne las imagenes que girarán en el Slider del Home. La resolución para Desktop es de <span className='font-bold'>1920x450</span> y para dispositivos móviles <span className='font-bold'>750x900</span></Alert>
            {carrouselImages?.length == 0 &&
                <Alert severity="warning" className='mt-2'>No hay imagenes cargadas para el slider</Alert>
            }
            <Divider className='my-4'>
                <Chip label={
                    <Typography className='text-sm uppercase'><FontAwesomeIcon icon={faEye} className='mr-2' />Vista previa del slider</Typography>
                } variant="outlined" />
            </Divider>
            <Box className="max-w-screen-xl m-auto mt-4">
                <CarouselHome images={filteredImages} />
            </Box>
            <Divider className='mt-4'>
                <Chip label={
                    <Typography className='text-sm uppercase'><FontAwesomeIcon icon={faUpload} className='mr-2' /><FontAwesomeIcon icon={faImage} className='mr-2' />Carga de imágenes</Typography>
                } variant="outlined" />
            </Divider>
            <MuiBox>
                <SliderControlClientPage images={carrouselImages} />
            </MuiBox>
        </Box>
    </>)
}

export const dynamic = 'force-dynamic';