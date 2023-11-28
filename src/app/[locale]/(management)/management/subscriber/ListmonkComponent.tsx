
'use client'
import React, { useState } from 'react'

function ListmonkComponent() {
    return <iframe
        src={process.env.NEXT_PUBLIC_LISTMONK_URL}
        width="100%"
        height="900px"
    />
}

export default ListmonkComponent