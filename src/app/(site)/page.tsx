import HomeHeader from '@/components/main-ui/HomeHeader';
import HomeImageBlock from '@/components/main-ui/HomeImageBlock';
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
            <CarouselHome images={carrouselImages} />
            <section>
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                    <HomeHeader />
                    <HomeImageBlock />
                </div>
            </section>
            <CarrouselProductServer />
        </>)
        ;
}