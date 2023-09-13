import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserPen, faKey, faCompass, faUserTag, faUserFriends, faPaperPlane, faPalette, faBoxesStacked, faAddressBook, faCartShopping, faTags, faUserTie, faUsers, faSliders, faSlidersH, faImages, faPortrait, faPhotoFilm, faPanorama, faQuestion, faComment } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from 'next/navigation'
import Link from 'next/link';

const categories = [
  {
    id: 'Cuenta',
    children: [
      { id: 'Mi Perfil', icon: faUserPen, href: '/management/my-profile', active: false },
      { id: 'Cambiar Contraseña', icon: faKey, href: '/management/change-password', active: false  },
    ],
  },
  {
    id: 'Cuentas de Usuario',
    children: [
      { id: 'Usuarios', icon: faUserTie, href: '/management/users', active: false },
      { id: 'Clientes', icon: faUsers, href: '/management/clients', active: false },
    ],
  },
  {
    id: 'Contenido Web',
    children: [
      { id: 'Slider Home', icon: faPanorama, href: '/management/content-manager/main-slider', active: false },
      { id: 'Imagenes Portada', icon: faPhotoFilm, href: '/management/content-manager/images-home', active: false },
      { id: 'FAQ', icon: faQuestion, href: '/management/content-manager/faq', active: false },
    ],
  },
  {
    id: 'Tienda',
    children: [
      { id: 'Productos', icon: faBoxesStacked, href: '/management/products', active: false },
      { id: 'Categorias', icon: faTags, href: '/management/categories', active: false },
      { id: 'Ordenes de compra', icon: faCartShopping, href: '/management/orders', active: false }
    ],
  },
  {
    id: 'Clientes',
    children: [
      { id: 'Mensajes de Contacto', icon: faComment, href: '/management/contacto', active: false }
    ],
  },
  {
    id: 'Email Marketing',
    children: [
      { id: 'Suscriptores', icon: faUserFriends, href: '/management/subscriber', active: false },
      { id: 'Enviar Emails', icon: faPaperPlane, href: '/management/send-emails', active: false },
      { id: 'Templates', icon: faPalette, href: '/management/email-templates', active: false }
    ],
  }
];

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const pathname = usePathname();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding sx={{borderColor: "red"}} className='bg-slate-200 dark:bg-slate-800'>
        <ListItem sx={{ fontSize: 22 }} className='h-12 pl-6'>
          <FontAwesomeIcon fixedWidth icon={faCompass} className='mr-4' /> ANT-mui
        </ListItem>
        <Link href={"/management"} className='no-underline'>
          <ListItem className='p-0'>
            <ListItemButton className='pl-6' selected={"/management"==pathname}>
              <ListItemIcon className='min-w-fit mr-4'>
                <FontAwesomeIcon fixedWidth icon={faHome} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{className:'text-sm font-bold text-gray-600 dark:text-slate-300'}}>Home</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        {categories.map(({ id, children }) => (
          <Box key={id} className='mb-4'>
            <Divider />
            <ListItem className='py-4 px-6'>
              <ListItemText primaryTypographyProps={{className:"font-bold"}}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, href }) => (
              <Link href={href} key={childId} className='no-underline'>
                <ListItem disablePadding >
                  <ListItemButton className='py-0 pl-6' selected={href==pathname}>
                    <ListItemIcon className='min-w-fit mr-4'>
                      <FontAwesomeIcon fixedWidth icon={icon} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{className:'text-sm font-bold text-gray-600 dark:text-slate-300'}}>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
