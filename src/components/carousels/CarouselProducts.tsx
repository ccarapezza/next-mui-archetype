import { useEffect, useState } from 'react';
import ProductCard from '../main-ui/ProductCard';
import Carousel from 'react-material-ui-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CarouselProducts = () => {

  const products = [
    {
      name: "Random Name #1",
      price: '$100',
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      bannerCta: '/'
    },
    {
      name: "Random Name #2",
      price: '$100',
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      bannerCta: '/'
    },
    {
      name: "Random Name #3",
      price: '$100',
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      bannerCta: '/'
    },
    {
      name: "Random Name #4",
      price: '$100',
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      bannerCta: '/'
    },
    {
      name: "Random Name #5",
      price: '$100',
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      bannerCta: '/'
    },
    {
      name: "Random Name #6",
      price: '$100',
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      bannerCta: '/'
    },
    {
      name: "Random Name #7",
      price: '$100',
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      bannerCta: '/'
    },
    {
      name: "Random Name #8",
      price: '$100',
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      bannerCta: '/'
    },
    {
      name: "Random Name #9",
      price: '$100',
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      bannerCta: '/'
    },
    {
      name: "Random Name #10",
      price: '$100',
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      bannerCta: '/'
    }
  ];

  // Pagination Slider
  const firstPageSlider = products.slice(0, 4);
  const secondPageSlider = products.slice(4, 8);
  const paginationSlider = [firstPageSlider, secondPageSlider];


  // Screen Width
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
      <h3 className='text-xl font-bold text-gray-900 sm:text-3xl mb-4 text-center'>Special Offers</h3>
      <Carousel
        navButtonsAlwaysVisible={true} // Show next and previous buttons
        animation='slide'               // Defines the animation style of the Carousel
        duration={1400}                  // Define the duration of the transition in ms. Default is 500 ms
        fullHeightHover={false}        // We want the nav buttons wrapper to only be as big as the button element is
        navButtonsProps={{             // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
          style: {
            color: '#4F46E5',
            backgroundColor: 'transparent',
            borderRadius: 50
          }
        }}
        NextIcon={<FontAwesomeIcon icon={faChevronRight} />}
        PrevIcon={<FontAwesomeIcon icon={faChevronLeft} />}
      >
        {
          windowWidth > 768 ?
            paginationSlider.map((arg, i) => {
              return (
                <div key={i} className='flex justify-evenly gap-x-1.5 mx-1'>
                  {
                    arg.map((product, i) => <ProductCard key={i} product={product} />)
                  }
                </div>
              )
            })
            :
            products.map((product, i) => {
              return (
                <ProductCard key={i} product={product} />
              )
            })
        }
      </Carousel>
    </div>
  )
}


export default CarouselProducts