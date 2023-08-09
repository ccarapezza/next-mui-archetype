'use client'
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function (props: { images: any, activeImage: number }) {

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
        images.map((image: any, i: number) => (
          <Image
            key={i}
            alt={image.alt}
            src={image.url}
            className="h-72 w-full rounded-xl object-cover lg:h-[540px]"
            height={540}
            width={700}
          />
        ))
      }
    </Carousel>
  )
}