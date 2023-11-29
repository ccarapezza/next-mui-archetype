'use client'
import { defaultTranslationValues } from '@/i18n'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import React from 'react'

export default function NextIntlClientCustomerProvider(props: { messages: AbstractIntlMessages, locale: string, children: React.ReactNode }) {
    return (
        <NextIntlClientProvider locale={props?.locale} messages={props?.messages} defaultTranslationValues={defaultTranslationValues}>
            {props?.children}
        </NextIntlClientProvider>
    )
}