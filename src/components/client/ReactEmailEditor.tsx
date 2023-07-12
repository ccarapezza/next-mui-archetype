"use client"
import React, { useRef } from 'react'
import { EditorRef, EmailEditor } from 'react-email-editor';


function ReactEmailEditor() {
    const emailEditorRef = useRef<EditorRef>(null);

    const exportHtml = () => {
        emailEditorRef.current?.editor?.exportHtml((data: { design: any; html: any; }) => {
            const { design, html } = data;
            console.log('exportHtml', html);
        });
    }

    const onReady = () => {
        console.log('onReady!');
        // editor is ready
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
    };

    return (<EmailEditor ref={emailEditorRef} onReady={onReady} />)

}

export default EmailEditor