import { useTranslations } from 'next-intl'
import React from 'react'

function HomeHeader() {
    const t = useTranslations('HomeHeader')
    return (<header className="text-center">
        <h2 data-testid="header-title" className="text-4xl font-tungsten text-primary sm:text-4xl font-normal">
            {t('title')}
        </h2>

        <p className="max-w-md mx-auto my-4 text-tertiary">
            {t('subtitle')}
        </p>
    </header>)
}

export default HomeHeader