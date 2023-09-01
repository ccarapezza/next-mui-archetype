import CollectionsGrid from '@/components/main-ui/CollectionsGrid';
import PopUpNewsletter from '@/components/main-ui/PopUpNewsletter';
import CarouselHome from '@/components/store/carousels/CarouselHome';
import CarrouselProductServer from '@/components/store/carousels/CarrouselProductServer';
import { mainSliderService } from '@/services/MainSliderService';

//get main getSignedUrlsByFolder
const fetchCarrouselImages = async () => {
    return await mainSliderService.getListOfMainSliderImages();
};

export default async function Home() {
    const carrouselImages = await fetchCarrouselImages();
    
    return (
        <>
            <PopUpNewsletter />
            <CarouselHome images={carrouselImages}/>
            <CollectionsGrid />
            <CarrouselProductServer />
        </>)
        ;
}