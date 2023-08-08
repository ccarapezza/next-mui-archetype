"use client"
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, TextField } from '@mui/material';
import React, { use, useEffect, useRef, useState } from 'react'
import { EditorRef, EmailEditor } from 'react-email-editor';


export default function ReactEmailEditor({id, name, template}:{id?: number, name?: string, template?: string}) {
    const emailEditorRef = useRef<EditorRef>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const nameRef = useRef<HTMLInputElement>();

    const exportHtml = () => {
        emailEditorRef.current?.editor?.saveDesign((data: any) => {
            console.log('saveDesign', data);
            if(editMode){
                updateEmailTemplateData({id: id, name: nameRef.current?.value, template: JSON.stringify(data)});
            }else{
                saveEmailTemplateData({name: nameRef.current?.value, template: JSON.stringify(data)});
            }
        });   
    }

    const updateEmailTemplateData = async (emailTemplate: any) => {
        console.log("EmailTemplate", emailTemplate);
        const res = await fetch(`http://localhost:3000/api/management/email-template/${emailTemplate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailTemplate)
        });
        return res.json();
    };
    
    const saveEmailTemplateData = async (emailTemplate: any) => {
        console.log("EmailTemplate", emailTemplate);
        const res = await fetch(`http://localhost:3000/api/management/email-template/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailTemplate)
        });
        return res.json();
    };

    const onReady = () => {
        console.log('onReady!');
        // editor is ready
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
        if(template){
            const templateJson = JSON.parse(template);
            emailEditorRef.current?.editor?.loadDesign(templateJson);
        }
    };

    useEffect(() => {
        setEditMode(id?true:false);
        if(template) {
            emailEditorRef.current?.editor?.loadDesign(JSON.parse(template));
        }
        if(name){
            nameRef.current?.setAttribute("value", name);
        }
    }, [template, name, id]);

    return (<>
        <Box className="flex items-center justify-between">
            <TextField size='small' placeholder='Template name...' inputRef={nameRef} />
            <Button startIcon={<FontAwesomeIcon icon={faSave} />} onClick={() => {exportHtml()}} variant="contained" color="primary" className='my-4'>
                Save Email
            </Button>
        </Box>
        <EmailEditor ref={emailEditorRef} onReady={onReady} locale='es' />
    </>)
}