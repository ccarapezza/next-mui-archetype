import {createSharedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;
export const getMessages = async (locale: string) => (await import(`../messages/${locale}.json`))?.default;
export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({locales});