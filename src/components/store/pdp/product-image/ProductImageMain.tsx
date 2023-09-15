'use client'
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function ProductImageMain(props: { images: string[], activeImage: number }) {

  const { images, activeImage } = props;

  return (

    <Carousel
      navButtonsAlwaysVisible={true}
      autoPlay={false}
      indicators={true}
      indicatorIconButtonProps={{
        className: 'md:hidden',
      }}
      fullHeightHover={false}
      index={activeImage}
      navButtonsProps={{
        style: {
          color: '#EFE6D9',
          backgroundColor: 'transparent',
          borderRadius: 50
        }
      }}
      navButtonsWrapperProps={{
        className: 'block md:hidden',
      }}
      NextIcon={<FontAwesomeIcon icon={faChevronRight} />}
      PrevIcon={<FontAwesomeIcon icon={faChevronLeft} />}
    >
      {
        images?.map((image: string, i: number) => (
          <Image
            key={i}
            alt={'Nombre pdp'}
            src={image}
            className="rounded-xl object-cover w-[600] h-[800]"
            height={800}
            width={600}
          />
        ))
      }
    </Carousel>
  )
}