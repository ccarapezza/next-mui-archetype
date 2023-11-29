import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/en.json';
import HomeHeader from '@/components/main-ui/HomeHeader';
import NextIntlClientCustomerProvider from '@/components/auth/providers/NextIntlClientCustomerProvider';

describe('HomeHeader', () => {
    it('Render Home Header', () => {
        render(
            <NextIntlClientCustomerProvider locale='es' messages={messages}>
                <HomeHeader />
            </NextIntlClientCustomerProvider>
        );
        const headerTitle = screen.getByTestId('header-title');
        const headerTitleText = messages.HomeHeader.title;
        expect(headerTitle).toBeInTheDocument();
        expect(headerTitle).toHaveTextContent(headerTitleText);
    });
});
