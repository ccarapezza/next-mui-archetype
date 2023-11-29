import { getRequestConfig } from 'next-intl/server';
import { ReactNode } from 'react';
import Bold from './components/main-ui/Bold';
import { RichTranslationValues } from 'next-intl';

export const locales = ['en', 'es'] as const;
export const getMessages = async (locale: string) => (await import(`../messages/${locale}.json`))?.default;

export const defaultTranslationValues: RichTranslationValues = {
    important: (chunks: React.ReactNode): ReactNode => Bold(chunks),
}

export default getRequestConfig(async ({ locale }) => ({
    messages: await getMessages(locale),
    defaultTranslationValues
}));