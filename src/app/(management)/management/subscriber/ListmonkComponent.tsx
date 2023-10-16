'use client'

import React, { useEffect, useState } from 'react'

function ListmonkComponent({ authorizationString, listmonkUrl }: { authorizationString: string, listmonkUrl: string }) {
    const [html, setHTML] = useState({ __html: "" });
    useEffect(() => {
        async function createMarkup() {
            let response;
            response = await fetch(listmonkUrl,
                {
                    //no cors config
                    mode: 'no-cors',
                    headers: {
                        Authorization: 'Basic ' + btoa(authorizationString),
                        'Content-Type': 'text/html'
                    }
                });
            return { __html: await response.text() };
        }
        createMarkup().then(result => setHTML(result));
    }, [authorizationString, listmonkUrl]);


    return <div dangerouslySetInnerHTML={html} />;
}

export default ListmonkComponent