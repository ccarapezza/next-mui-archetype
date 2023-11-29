'use client';

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from "react";
import { pageview } from "@/utils/GtagHelper";
import Script from 'next/script'

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string | null | undefined }) {

    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if(GA_MEASUREMENT_ID){
            const url = pathname + searchParams.toString()
            pageview(GA_MEASUREMENT_ID, url);
        }
    }, [pathname, searchParams, GA_MEASUREMENT_ID]);

    return (
        <>
            {GA_MEASUREMENT_ID&&
                <>
                    <Script strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
                    <Script id='google-analytics' strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('consent', 'default', {
                            'analytics_storage': 'denied'
                        });
                        
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                        });
                        `,
                        }}
                    />
                </>
            }
        </>
    )
}