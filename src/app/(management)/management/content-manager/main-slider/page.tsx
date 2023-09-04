import PageHeader from '@/components/management/paperbase/PageHeader';
import SliderControlClientPage from './sliderControl';
import { Alert, Box, Typography } from '@mui/material';
import MuiBox from '@/components/client/MuiBox';
import { mainSliderService } from '@/services/MainSliderService';
import CarouselHome from '@/components/store/carousels/CarouselHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const fetchCarrouselImages = async () => {
    return await mainSliderService.getListOfMainSliderImages();
}

export default async function MainSliderPage() {
    const carrouselImages = await fetchCarrouselImages();
    return (<>
        
        <Alert severity="info" className='m-6'>Asigne las imagenes que girarán en el Slider del Home. La resolución para Desktop es de <span className='font-bold'>1920x450</span> y para dispositivos móviles <span className='font-bold'>750x900</span></Alert>
        {carrouselImages?.length>0&&
            <Box className="p-4 border rounded">
                <Typography variant="h6" className='m-6'><FontAwesomeIcon icon={faEye} className='mr-2'/>Vista previa del slider</Typography>
                <CarouselHome images={carrouselImages.filter((image)=>image.visible)}/>
            </Box>
        }
        <MuiBox className="p-6">
            <SliderControlClientPage images={carrouselImages}/>
        </MuiBox>    
    </>)
}
