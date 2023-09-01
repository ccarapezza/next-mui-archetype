import PageHeader from '@/components/management/paperbase/PageHeader';
import SliderControlClientPage from './sliderControl';
import { Alert } from '@mui/material';
import MuiBox from '@/components/client/MuiBox';
import { mainSliderService } from '@/services/MainSliderService';

const fetchCarrouselImages = async () => {
    return await mainSliderService.getListOfMainSliderImages();
}

export default async function MainSliderPage() {
    const carrouselImages = await fetchCarrouselImages();
    return (<>
        <PageHeader title="Slider Home" />
        <Alert severity="info" className='m-6'>Asigne las imagenes que girarán en el Slider del Home. La resolución para Desktop es de <span className='font-bold'>1920x450</span> y para dispositivos móviles <span className='font-bold'>750x900</span></Alert>
        <MuiBox className="p-6">
            <SliderControlClientPage images={carrouselImages}/>
        </MuiBox>    
    </>)
}
