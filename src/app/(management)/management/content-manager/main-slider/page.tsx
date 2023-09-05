import SliderControlClientPage from './sliderControl';
import { Alert, Box, Card, CardContent, CardHeader, Chip, Divider, Typography } from '@mui/material';
import MuiBox from '@/components/client/MuiBox';
import CarouselHome from '@/components/store/carousels/CarouselHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faImage, faUpload } from '@fortawesome/free-solid-svg-icons';
import { sliderImageService } from '@/services/SliderImageService';
import PageHeader from '@/components/management/paperbase/PageHeader';

const fetchCarrouselImages = async () => {
    return await sliderImageService.getListOfMainSliderImages();
}

export default async function MainSliderPage() {
    const carrouselImages = await fetchCarrouselImages();
    const filteredImages = carrouselImages.filter((image) => image.visible);
    return (<>
        <PageHeader title="Slider Home" />
        <Box className="m-4">
            <Alert severity="info">Asigne las imagenes que girarán en el Slider del Home. La resolución para Desktop es de <span className='font-bold'>1920x450</span> y para dispositivos móviles <span className='font-bold'>750x900</span></Alert>
            <Divider className='mt-4'>
                <Chip label={
                    <Typography variant="h6" className='m-6'><FontAwesomeIcon icon={faUpload} className='mr-2' /><FontAwesomeIcon icon={faEye} className='mr-2' />Vista previa del slider</Typography>
                } variant="outlined" />
            </Divider>
            {carrouselImages?.length > 0 &&
                <Card className='mt-4 shadow-lg border rounded-md'>
                    <CardHeader title={
                        <Typography><FontAwesomeIcon icon={faEye} className='mr-2' />Vista previa del slider</Typography>
                    } className='bg-gray-100' />
                    <CardContent>
                        <Box className="max-w-screen-xl m-auto">
                            <CarouselHome images={filteredImages} />
                        </Box>
                    </CardContent>
                </Card>
            }
            <Divider className='mt-4'>
                <Chip label={
                    <Typography variant="h6" className='m-6'><FontAwesomeIcon icon={faUpload} className='mr-2' /><FontAwesomeIcon icon={faImage} className='mr-2' />Carga de imágenes</Typography>
                } variant="outlined" />
            </Divider>
            <MuiBox>
                <SliderControlClientPage images={carrouselImages} />
            </MuiBox>
        </Box>
    </>)
}
