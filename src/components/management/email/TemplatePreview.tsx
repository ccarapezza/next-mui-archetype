'use client'
import LoadingUI from '@/components/main-ui/LoadingUI'
import { faClose, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardContent, CardHeader, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { EditorRef, EmailEditor } from 'react-email-editor'

function TemplatePreview({ onClose, template, show, onTemplateHtmlExport }: { onClose: any, template: TemplateDto, show: boolean, onTemplateHtmlExport: any }) {
    const emailEditorRef = useRef<EditorRef>(null);
    const [loading, setLoading] = useState(true);
    const [ready, setReady] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [htmlTemplateSelected, setHtmlTemplateSelected] = useState("");



    useEffect(() => {
        if (htmlTemplateSelected && show) {
            const previewEl = document.getElementById("preview");
            if (previewEl !== null) {
                previewEl.innerHTML = htmlTemplateSelected;
            }
        }
    }, [htmlTemplateSelected, show]);

    useEffect(() => {
        console.log("template", template);
        setReady(false);
        setLoaded(false);
        setLoading(true);
    }, [template]);

    useEffect(() => {
        if (ready && template) {
            new Promise((resolve, reject) => {
                if (template) {
                    const templateJson = JSON.parse(template.template);
                    emailEditorRef.current?.editor?.loadDesign(templateJson);
                    emailEditorRef.current?.editor?.exportHtml((data) => {
                        const { design, html } = data;
                        console.log('exportHtml', html);
                        setHtmlTemplateSelected(html);
                        if (onTemplateHtmlExport) {
                            onTemplateHtmlExport(html);
                        }
                        console.log('design', design);
                        setLoaded(true);
                    });
                    resolve(true);
                } else {
                    reject();
                }
            }).then((result) => {
                console.log("result", result);
            }).catch((error) => {
                console.log("error", error);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [ready, template, onTemplateHtmlExport]);

    const onReady = () => {
        console.log("ready", ready);
        setReady(true);
    };

    return (<>
        {loading && show &&
            <Card className='shadow rounded border p-4 mt-4 flex justify-center'>
                <LoadingUI />
            </Card>
        }
        <Card className={`shadow rounded border p-4 mt-4 ${(!loading && template && show) ? "" : "hidden"}`}>
            <CardHeader title={<Stack direction={'row'}>
                <FontAwesomeIcon icon={faEye} className='mr-2' />
                <Typography className='font-bold'>Preview: </Typography>
                <Typography>{template?.name}</Typography>
            </Stack>}
                action={
                    <IconButton onClick={onClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </IconButton>
                } />
            <CardContent id="preview">

            </CardContent>
        </Card>
        {!loaded &&
            <div className='hidden'>
                <EmailEditor ref={emailEditorRef} onReady={onReady} locale='es' />
            </div>
        }
    </>)
}

export default TemplatePreview