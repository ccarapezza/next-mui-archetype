'use client';

import Image from 'next/image'
import logo from "../../assets/logos/CMD-Logo-Footer.png";
import SubscriptionForm from './SubscriptionForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {

  const footerNavs = [
    {
      label: "Categorias",
      items: [
        {
          href: '/hombre',
          name: 'Hombre',
          icon: null
        },
        {
          href: '/mujer',
          name: 'Mujer',
          icon: null
        },
        {
          href: '/nino',
          name: 'Niño',
          icon: null
        },
        {
          href: '/sale',
          name: 'Sale',
          icon: null
        },
      ],
    },
    {
      label: "Nosotros",
      items: [
        {
          href: '/faq',
          name: 'Preguntas frecuentes',
          icon: null
        },
        {
          href: '/terminos-y-condiciones',
          name: 'Terminos y condiciones',
          icon: null
        }
      ],
    },
    {
      label: "Síguenos",
      items: [
        {
          href: '/',
          name: 'instagram',
          icon: faInstagram
        },
        {
          href: '/',
          name: 'facebook',
          icon: faFacebookF
        },
        {
          href: '/',
          name: 'twitter',
          icon: faTwitter
        }
      ]
    }
  ]

  return (
    <footer className="absolute bottom-0 text-quaternary bg-tertiary  w-full">
      <div className="px-4 py-5 mx-auto md:px-8  max-w-screen-xl">
        <div className="gap-6 justify-between md:flex">
          <div className="flex-1">
            <div className="flex justify-center items-center md:items-start md:justify-start">
              <a href="/">
                <Image src={logo} className="dark:hidden" alt='Float UI logo' width={250}/>
              </a>
              {/* <p className="leading-relaxed mt-2 text-[15px]">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p> */}
            </div>
            <SubscriptionForm mode='footer' />
          </div>
          <div className="flex-1 mt-10 space-y-6 justify-between sm:flex md:space-y-0 md:mt-0">
            {
              footerNavs.map((item, idx) => (
                <ul
                  className="space-y-4"
                  key={idx}
                >
                  <h4 className="text-secondary underline font-medium">
                    {item.label}
                  </h4>
                  {
                    item.items.map(((el, idx) => (
                      <li key={idx}>
                        {
                          el.icon != null ?
                            <a
                              href={el.href}
                              className="hover:underline hover:text-primary"
                            >
                              <FontAwesomeIcon icon={el.icon} className='text-2xl' />
                            </a>
                            :
                            <a
                              href={el.href}
                              className="hover:underline hover:text-primary"

                            >
                              {el.name}
                            </a>
                        }

                      </li>
                    )))
                  }
                </ul>
              ))
            }
          </div>
        </div>
        <div className="mt-8 py-6 border-t items-center justify-between xl:flex">
          <div className="text-center mt-4 sm:mt-0 md:text-center">
             Todos los derechos reservados CULTIVO MIS DERECHOS &copy; - 2023
          </div>
          <div className="text-center mt-6 sm:mt-0 md:text-center">
            <h5>Desarrollado por: Random Brand!</h5>
          </div>
        </div>
      </div>
    </footer>
  )
};
