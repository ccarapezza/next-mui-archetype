'use client';
import ImageCropEditor from '@/components/client/ImageCropEditor';
import LoadingBlocker from '@/components/client/LoadingBlocker';
import { SliderImageDto } from '@/schemas/sliderImage';
import { faClose, faEdit, faEye, faImage, faLink, faMagnifyingGlass, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Card, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, OutlinedInput, Switch, TextField, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

const uploadFile = async (file: File) => {
    //get presigner url from server
    const presignedUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/content-manager/main-slider/upload-image-slider/jpg`, {
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
    const imageSliderSaveUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/content-manager/main-slider/upload-image-slider`, {
        method: 'POST',
        body: JSON.stringify({
            key: key
        })
    });

    if (!imageSliderSaveUrlResponse.ok) {
        deleteFile(key);
        throw new Error("Error al guardar la imagen");
    }
    return imageSliderSaveUrlResponse.json();
}

const deleteFile = async (key: string) => {
    //get presigner url from server
    const presignedUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/content-manager/main-slider/delete-image-slider/${key}`, {
        method: 'DELETE',
    });
    if (!presignedUrlResponse.ok) {
        throw new Error("Error al eliminar la imagen");
    }
    return await presignedUrlResponse.json();
}

export default function SliderImagesControl({defaultFiles = [], onChange, name}: {defaultFiles?: SliderImageDto[], onChange: Function, name: string}) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [fileToUpload, setFileToUpload] = useState<File|null>(null);
    const [preview, setPreview] = useState<File|null>(null);
    const [files, setFiles] = useState<SliderImageDto[]>(defaultFiles);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addFile = (file: File, itemId: number) => {
        setIsLoading(true);
        uploadFile(file).then((sliderImage) => {
            setFiles([...files, {
                ...sliderImage
            }]);
            setFileToUpload(null);
        }).catch((error) => {
            console.log("error", error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const removeFile = (fileIndex: number) => {
        setIsLoading(true);
        deleteFile(files[fileIndex].key).then((response) => {
            setFiles(files!.filter((file, index) => index !== fileIndex));
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
        onChange(files.map((file) => file.key));
    }, [files, onChange]);

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
                        compressedWidth={1920}
                        compressedHeight={450}
                        compressedSizeOnKb={150}
                        file={preview}
                        setFormatedFile={
                            (file: File) => {
                                addFile(file, 0);
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
        <Card className='p-4 mb-4 flex justify-center'>
            <div className='grid grid-cols-1 gap-2 items-center mb-4'>
                {files.map((file, index) => (<div className='grid-col-1 border rounded p-2 max-w-4xl' key={name+"-"+index}>
                    <Image id={`image-${file.key}`} width={1920} height={450} src={file.image} alt="preview image" />
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
                            <Switch size='small' color='primary' checked={file.visible} />
                        </Box>
                        <Button className='mt-2' color='error' variant='outlined' startIcon={<FontAwesomeIcon className='text-red-500 cursor-pointer' icon={faTrash} />} size='small' onClick={() => removeFile(index)}>
                            <Typography variant='caption' className='mt-0.5'>Eliminar</Typography>
                        </Button>
                    </Box>
                </div>))}
                <div>
                    <Tooltip title="Agregar imagen">
                        <Button size='small' variant='outlined' onClick={() => inputFileRef.current?.click()} className='mb-4 p-2'>
                            <Typography variant='caption' className='mt-0.5'>
                                Agregar imagen
                            </Typography>
                            <FontAwesomeIcon icon={faImage} className='ml-2' />
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </Card>
    </>)
}