import { getRequestConfig } from 'next-intl/server';
import { getMessages } from './navigation';

export default getRequestConfig(async ({ locale }) => ({
    messages: await getMessages(locale),
}));