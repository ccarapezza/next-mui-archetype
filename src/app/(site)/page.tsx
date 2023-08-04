import CollectionsGrid from '@/components/main-ui/CollectionsGrid';
import PopUpNewsletter from '@/components/main-ui/PopUpNewsletter';
import CarouselHome from '@/components/store/carousels/CarouselHome';
import CarrouselProductServer from '@/components/store/carousels/CarrouselProductServer';

export default function Home() {
    return (
        <>
            <PopUpNewsletter />
            <CarouselHome />
            <CollectionsGrid />
            <CarrouselProductServer />
        </>)
        ;
}