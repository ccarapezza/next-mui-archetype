'use client';
import ImageCropEditor from '@/components/client/ImageCropEditor';
import LoadingBlocker from '@/components/client/LoadingBlocker';
import { ImageContainerDto } from '@/schemas/imageContainer';
import { faClose, faEdit, faEye, faImage, faLink, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Card, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, OutlinedInput, Stack, Switch, TextField, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

const uploadFile = async (file: File, code: string) => {
    //get presigner url from server
    const presignedUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/content-manager/image-container/upload-image-container/jpg`, {
        method: 'GET',
    });
    if (!presignedUrlResponse.ok) {
        throw new Error("Error al obtener la url de subida");
    }
    const { uploadUrl, key } = await presignedUrlResponse.json();
    //upload file to s3
    const uploadFileResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
    });
    if (!uploadFileResponse.ok) {
        throw new Error("Error al subir la imagen");
    }
    const imageContainerSaveUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/content-manager/image-container/upload-image-container`, {
        method: 'POST',
        body: JSON.stringify({
            key: key,
            code: code
        })
    });

    if (!imageContainerSaveUrlResponse.ok) {
        deleteFile(key);
        throw new Error("Error al guardar la imagen");
    }
    return imageContainerSaveUrlResponse.json();
}

const deleteFile = async (key: string) => {
    //get presigner url from server
    const presignedUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/content-manager/image-container/delete-image-slider/${key}`, {
        method: 'DELETE',
    });
    if (!presignedUrlResponse.ok) {
        throw new Error("Error al eliminar la imagen");
    }
    return await presignedUrlResponse.json();
}

const getImageContainer = async (code: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/content-manager/image-container/get-image-container/${code}`, {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error("Error al obtener la imagen");
    }
    return await response.json();
}

export default function ImageContainerControl({code, size:{ width = 774, height = 1161}, compressedSizeOnKb=150, name}: {code:string, size: {width: number, height: number}, name: string, compressedSizeOnKb?: number}) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [fileToUpload, setFileToUpload] = useState<File|null>(null);
    const [preview, setPreview] = useState<File|null>(null);
    const [file, setFile] = useState<ImageContainerDto|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const uploadFileAction = (file: File) => {
        setIsLoading(true);
        uploadFile(file, code).then((imageContainer) => {
            setFile(imageContainer);
            setFileToUpload(null);
        }).catch((error) => {
            console.log("error", error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const removeFile = () => {
        setIsLoading(true);
        deleteFile(code).then((response) => {
            setFile(null);
        }).catch((error) => {
            console.log("error", error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        if (fileToUpload) {
            setPreview(fileToUpload);
        } else {
            setPreview(null);
        }
    }, [fileToUpload]);

    useEffect(() => {
        console.log("code", code);
        getImageContainer(code).then((imageContainer: ImageContainerDto) => {
            setFile(imageContainer);
            fetch(imageContainer.image).then((response) => {
                return response.blob();
            }).then((blob) => {
                const file = new File([blob], imageContainer.key, { type: blob.type });
                setPreview(file);
            }).catch((error) => {
                console.log("error", error);
            });
        }).catch((error) => {
            console.log("error", error);
        });
    }, [code]);

    return (<>
        {isLoading &&
            <LoadingBlocker />
        }
        <Dialog open={!!fileToUpload} onClose={() => setFileToUpload(null)}>
            {isLoading &&
                <div className='absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center z-50'>
                    <CircularProgress />
                </div>
            }
            <DialogTitle className='flex justify-between'>
                <Typography variant="h6" component="div">
                    Vista previa
                </Typography>
                <IconButton onClick={()=>{setFileToUpload(null)}} className='text-gray-500'>
                    <FontAwesomeIcon icon={faClose} />
                </IconButton>
            </DialogTitle>
            <DialogContent className="flex flex-col items-center justify-center">
                {preview&&
                    <ImageCropEditor
                        compressedWidth={width}
                        compressedHeight={height}
                        compressedSizeOnKb={compressedSizeOnKb}
                        file={preview}
                        setFormatedFile={
                            (file: File) => {
                                uploadFileAction(file);
                            }
                        }
                    />
                }
            </DialogContent>
        </Dialog>
        <input
            ref={inputFileRef}
            type="file"
            name={name}
            multiple={false}
            accept="image/png, image/jpeg"
            className='hidden'
            onChange={(e) => e.target.files?.length! > 0 && setFileToUpload(e.target.files![0])}
        />
        <div className='grid grid-cols-1 gap-2 items-center justify-center mb-4'>
            {file && (<div className='grid-col-1 border rounded p-2 max-w-sm'>
                <Image id={`image-${file.key}`} width={width} height={height} src={file.image} alt="preview image" />
                <Box className="flex flex-col items-start">
                    <OutlinedInput 
                        className='mt-2'
                        classes={{
                            notchedOutline: 'border-0'
                        }}
                        size='small'
                        fullWidth
                        startAdornment={<InputAdornment position="start"><FontAwesomeIcon icon={faLink} /></InputAdornment>} placeholder='Enlace...'
                        endAdornment={<InputAdornment position="end">Editar<FontAwesomeIcon icon={faEdit} className='pl-2' /></InputAdornment>}
                    />
                    <Box className="flex items-center justify-center mt-2 ml-1">
                        <Box className="flex items-center">
                            <FontAwesomeIcon icon={faEye} /><Typography component="span" variant='subtitle2' className='ml-2'>Visible: </Typography>
                        </Box>
                    </Box>
                    <Button className='mt-2' color='error' variant='outlined' startIcon={<FontAwesomeIcon className='text-red-500 cursor-pointer' icon={faTrash} />} size='small' onClick={() => removeFile()}>
                        <Typography variant='caption' className='mt-0.5'>Eliminar</Typography>
                    </Button>
                </Box>
            </div>)}
            <div>
                <Tooltip title="Cargar imagen">
                    <Button size='small' variant='outlined' onClick={() => inputFileRef.current?.click()} className='mb-4 p-2'>
                        <Stack>
                            <Typography variant='caption' className='mt-0.5'>
                                Cargar imagen
                            </Typography>
                            <small>{code}</small>
                        </Stack>
                        <FontAwesomeIcon icon={faImage} className='ml-2' />
                    </Button>
                </Tooltip>
            </div>
        </div>
    </>)
}