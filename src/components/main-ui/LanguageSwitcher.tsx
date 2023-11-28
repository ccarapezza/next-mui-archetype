'use client';

import { locales, usePathname, useRouter } from "@/navigation";
import { faGlobeAmericas, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const t = useTranslations('LanguageSwitcher');

    const changeLanguage = (lang: string) => {
        router.push(pathname, { locale: lang });
    };

    return (<div>
        <div className="text-xl cursor-pointer h-8 flex items-center justify-center w-8 relative" onClick={() => setOpen(!open)}>
            <Badge color="primary" badgeContent={locale.toUpperCase()} classes={{
                badge: 'bg-primary text-white p-1 text-[10px] font-bold left-[10px]'
            }}>
                <FontAwesomeIcon icon={faLanguage} className='text-tertiary hover:text-primary' />
            </Badge>
        </div>
        {/*Floating menu with languages*/}
        <div className={`${open?'absolute':'hidden'} bg-white p-4 rounded-md shadow-lg shadow-tertiary border w-48`}>
            <div className='flex justify-between flex-col pt-1'>
                {locales.map((currLocale) => (
                    <div key={`language-container-${currLocale}`} className={`pb-1 px-2 rounded ${locale===currLocale?'font-bold cursor-default':'cursor-pointer hover:font-bold hover:bg-slate-200'} `} onClick={() => changeLanguage(currLocale) }>
                        <span>{t(`languages.${currLocale}`)}</span> (<span>{t(`nativeLanguages.${currLocale}`)}</span>)
                    </div>
                ))}
            </div>
        </div>
    </div>);
}