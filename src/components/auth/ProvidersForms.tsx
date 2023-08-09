import React, { Fragment } from 'react'
import { signIn } from "next-auth/react"
import { LiteralUnion, ClientSafeProvider } from "next-auth/react/types"
import type { BuiltInProviderType } from "next-auth/providers";
import CredentialsForm from './providers/CredentialsForm';
import GoogleForm from './providers/GoogleForm';

export default function ProvidersForms({ providers }: { providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> } ) {

    return (<>
        {providers && Object.values(providers).map((provider, index) => (
            <Fragment key={provider?.name}>
                {index!==0 &&
                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">O</div>
                }
                {(() => {
                    switch (provider?.id) {
                        case 'google':
                            return <GoogleForm provider={provider} />;
                        case 'credentials':
                            return <CredentialsForm provider={provider} />
                        default:
                            return <button onClick={() => {signIn(provider.id, {callbackUrl: '/management'})}}>Iniciar sesión con {provider.name}</button>
                        }
                })()}
            </Fragment>
        ))}
    </>)
}
