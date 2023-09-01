'use client';
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

type Item = {
    name: string;
    urlImageDesktop: string;
    urlImageMobile: string;
    bannerCta: string;
};

const CarouselHome = ({ images }: { images: string[] }) => {
    const dummyItems: Item[] = [
        {
            name: "Random Name #1",
            urlImageDesktop: 'https://dummyimage.com/1920x450/322F30/EFE6D9.png',
            urlImageMobile: 'https://dummyimage.com/750x900/322F30/EFE6D9.png',
            bannerCta: '/'
        },
        {
            name: "Random Name #2",
            urlImageDesktop: 'https://dummyimage.com/1920x450/322F30/EFE6D9.png',
            urlImageMobile: 'https://dummyimage.com/750x900/322F30/EFE6D9.png',
            bannerCta: '/'
        }
    ];

    const items: Item[] = images.map((image, index) => {
        return {
            name: `Random Name #${index}`,
            urlImageDesktop: image,
            urlImageMobile: image,
            bannerCta: '/'
        }
    });

    if(!items?.length){
        items.push(...dummyItems);
    }

    return (
        <div>
            <Carousel
                navButtonsAlwaysVisible={true} // Show next and previous buttons
                fullHeightHover={false}     // We want the nav buttons wrapper to only be as big as the button element is
                navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                    style: {
                        color: '#EFE6D9',
                        backgroundColor: 'transparent',
                        borderRadius: 50
                    }
                }}
                navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
                    //  style: {
                    //      bottom: '0',
                    //      top: 'unset'
                    //  }
                }}
                NextIcon={<FontAwesomeIcon icon={faChevronRight} />}
                PrevIcon={<FontAwesomeIcon icon={faChevronLeft} />}
            >
                {
                    items.map((item: Item, i) => <Item key={i} item={item} />)
                }
            </Carousel>
        </div>
    )
}

function Item(props: { item: Item }) {
    return (
        <>
            <Paper>
                <a href="/" className='hidden md:flex items-center justify-center'>
                    <Image
                        src={props.item.urlImageDesktop}
                        alt={`Image of ${props.item.name}`}
                        width={1920}
                        height={450}
                    />
                </a>
                <a href="/" className='flex items-center justify-center md:hidden'>
                    <Image
                        src={props.item.urlImageMobile}
                        alt={`Image of ${props.item.name}`}
                        width={750}
                        height={900}
                    />
                </a>
            </Paper>
        </>
    )
}

export default CarouselHome