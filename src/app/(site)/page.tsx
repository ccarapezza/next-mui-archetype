import HomeHeader from '@/components/main-ui/HomeHeader';
import HomeImageBlock from '@/components/main-ui/HomeImageBlock';
import PopUpNewsletter from '@/components/main-ui/PopUpNewsletter';
import CarouselHome from '@/components/store/carousels/CarouselHome';
import CarrouselProductServer from '@/components/store/carousels/CarrouselProductServer';
import { sliderImageService } from '@/services/SliderImageService';

//get main getSignedUrlsByFolder
const fetchCarrouselImages = async () => {
    return await sliderImageService.getVisibleImages();
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
//5 minutes
export const revalidate = 300;