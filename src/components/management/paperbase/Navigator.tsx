import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserGroup, faUserPen, faKey, faCompass, faUserTag, faUserFriends, faPaperPlane, faPalette, faBoxesStacked, faReceipt, faAddressBook, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

const categories = [
  {
    id: 'Menu',
    children: [
      { id: 'My Profile', icon: faUserPen, href: '/management/my-profile', active: false },
      { id: 'Change Password', icon: faKey, href: '/management/change-password', active: false  },
    ],
  },
  {
    id: 'User Management',
    children: [
      { id: 'Users', icon: faUserGroup, href: '/management/users', active: false },
      { id: 'Roles', icon: faUserTag, href: '/management/roles', active: false },
    ],
  },
  {
    id: 'Email Marketing',
    children: [
      { id: 'Subscribers', icon: faUserFriends, href: '/management/subscriber', active: false },
      { id: 'Send Email', icon: faPaperPlane, href: '/management/send-emails', active: false },
      { id: 'Templates', icon: faPalette, href: '/management/templates', active: false },
      //{ id: 'Campaigns', icon: faUserGroup, href: '/management/campaigns', active: false },
    ],
  },
  {
    id: 'eCommerce',
    children: [
      { id: 'Products', icon: faBoxesStacked, href: '/management/products', active: false },
      { id: 'Orders', icon: faCartShopping, href: '/management/orders', active: false },
      { id: 'Customers', icon: faAddressBook, href: '/management/customers', active: false },
    ],
  },
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
