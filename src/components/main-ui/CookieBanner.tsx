'use client';

import { useEffect, useState } from 'react';
import useClientLocalStorage from '@/hooks/useClientLocalStorage';
import { useTranslations } from 'next-intl';

export default function CookieBanner() {
    const [cookieConsent, setCookieConsent] = useClientLocalStorage('cookie_consent', null);
    const [cookieConsentState, setCookieConsentState] = useState<boolean | undefined>(undefined);
    const t = useTranslations('CookieBanner');
    
    useEffect(() => {
        setCookieConsentState(cookieConsent?cookieConsent:false);
        window.gtag("consent", 'update', {
            'analytics_storage': cookieConsent ? 'granted' : 'denied'
        });
    }, [cookieConsent]);

    return (cookieConsentState !== undefined &&
        <div className={`${cookieConsentState ? "hidden" : "flex"} my-4 mx-4 max-w-max md:max-w-screen-sm fixed bottom-0 left-0 right-0 px-3 md:mx-auto md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4 border-gray-200 bg-white rounded-lg border z-50 shadow-2xl cursor-default`}>
            <div className='text-center text-sm'>
                <p>{t.rich('disclaimer')}</p>
            </div>
            <div className='flex gap-2'>
                <button className='px-5 py-2 text-slate-400 rounded-md border border-slate-400 text-sm hover:bg-slate-100' onClick={() => setCookieConsent(false)}>{t('button.deny')}</button>
                <button className='bg-gray-900 px-5 py-2 text-white rounded-lg text-sm hover:bg-gray-800' onClick={() => setCookieConsent(true)}>{t('button.accept')}</button>
            </div>
        </div>
    )
}