'use client'
import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import ProductCard from '@/components/main-ui/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function CarouselProducts(props: { products: any[] }) {

  // Pagination Slider
  const firstPageSlider = props.products.slice(0, 4);
  const secondPageSlider = props.products.slice(4, 8);
  const paginationSlider = [firstPageSlider];
  if (props.products.length > 4) {
    paginationSlider.push(secondPageSlider);
  }

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
      <h3 className='text-4xl font-tungsten text-primary sm:text-4xl mb-4 text-center font-normal'>NUESTRA SELECCIÓN</h3>
      {/* {JSON.stringify(props.products)} */}
      <Carousel
        navButtonsAlwaysVisible={true} // Show next and previous buttons
        animation='slide'               // Defines the animation style of the Carousel
        duration={1400}                  // Define the duration of the transition in ms. Default is 500 ms
        fullHeightHover={false}        // We want the nav buttons wrapper to only be as big as the button element is
        navButtonsProps={{             // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
          style: {
            color: '#EFE6D9',
            backgroundColor: 'transparent',
            borderRadius: 50
          }
        }}
        indicatorContainerProps={{
          style: {
            marginTop: '30px'
          }
        }}
        NextIcon={<FontAwesomeIcon icon={faChevronRight} />}
        PrevIcon={<FontAwesomeIcon icon={faChevronLeft} />}
      >
        {
          windowWidth > 768 ?
            paginationSlider.map((arg, i) => {
              return (
                <div key={i} className='grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4 mx-1'>
                  {
                    arg.map((product, i) => <ProductCard key={i} product={product} />)
                  }
                </div>
              )
            })
            :
            props.products.map((product, i) => {
              return (
                <ProductCard key={i} product={product} />
              )
            })
        }
      </Carousel> 
    </div>
  )
}
