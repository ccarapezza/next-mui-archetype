'use client';

import Image from 'next/image'
import SubscriptionForm from '../../main-ui/SubscriptionForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

export default function Footer(props: { categoryTree: any }) {

  const { categoryTree } = props;

  const date = new Date();
  const currentYear = date.getFullYear();

  function clearNameForUrl(urlCategory: string) {
    // Convertir a minúsculas y eliminar acentos
    urlCategory = urlCategory.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');
    // Reemplazar caracteres especiales y espacios por guiones
    urlCategory = urlCategory.replace(/[^\w]/g, '');

    return urlCategory;
  }

  const categoryNav = categoryTree.map((category: any) => {
    return {
      name: category.name,
      href: `/category/${clearNameForUrl(category.name)}`,
      icon: null
    }
  })

  const footerNavs = [
    {
      label: "Tienda",
      href: '/category/tienda',
      items: categoryNav
    },
    {
      label: "Nosotros",
      href: '/nosotros',
      items: [
        {
          href: '/nosotros',
          name: 'Sobre Nosotros',
        },
        {
          href: '/aliados',
          name: 'Aliados',
        },
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
      href: '/',
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
              <Link href="/">
                <Image src="/logos/CMD-Logo-Footer.png" className="dark:hidden" alt='Float UI logo' width={250} height={250} />
              </Link>
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
                  <Link
                    href={item.href}
                    className="hover:underline hover:text-primary"
                  >
                    <h4 className="text-secondary underline font-medium">
                      {item.label}
                    </h4>
                  </Link>
                  {
                    item.items.map(((el: any, idx: number) => (
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
                            <Link
                              href={el.href}
                              className="hover:underline hover:text-primary"

                            >
                              {el.name}
                            </Link>
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
            Todos los derechos reservados CULTIVO MIS DERECHOS &copy; - {currentYear}
          </div>
          <div className="text-center mt-6 sm:mt-0 md:text-center">
            <h5>Desarrollado por: Random Brand!</h5>
          </div>
        </div>
      </div>
    </footer>
  )
};
