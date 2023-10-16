
'use client'
import React, { useState } from 'react'

function ListmonkComponent({ authorizationString, listmonkUrl }: { authorizationString: string, listmonkUrl: string }) {

    console.log(authorizationString)
    console.log(listmonkUrl)
    console.log(btoa(authorizationString))

    const [iframeUrl, setIframeUrl] = useState<string>();
    
    //get fetch
    fetch("https://listmonk.cultivomisderechos.com.ar/api/health", {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(authorizationString)
        }
    }).then((response) => {
        console.log(response)
        setIframeUrl(listmonkUrl);
    }).catch((error) => {
        console.log(error)
    })

    fetch("https://listmonk.cultivomisderechos.com.ar/admin", {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(authorizationString)
        }
    }).then((response) => {
        console.log(response)
        setIframeUrl(listmonkUrl);
    }).catch((error) => {
        console.log(error)
    })

    return <>
        {listmonkUrl&&
            <iframe
                //src={"https://listmonk:zHuPcUuxt07rRT06PBnMFjibU36GpW@listmonk.cultivomisderechos.com.ar/admin"}
                src={"https://listmonk.cultivomisderechos.com.ar/admin"}
                width="100%"
                height={"900px"}
                scrolling="no"
            />
        }
    </>
}

export default ListmonkComponent