import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/en.json';
import HomeHeader from '@/components/main-ui/HomeHeader';

describe('HomeHeader', () => {
    it('Render Home Header', () => {
        render(
            <NextIntlClientProvider locale='es' messages={messages}>
                <HomeHeader />
            </NextIntlClientProvider>
        );
        const headerTitle = screen.getByTestId('header-title');
        const headerTitleText = messages.HomeHeader.title;
        expect(headerTitle).toBeInTheDocument();
        expect(headerTitle).toHaveTextContent(headerTitleText);
    });
});
