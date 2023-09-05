'use client';
import ImageCropEditor from '@/components/client/ImageCropEditor';
import LoadingBlocker from '@/components/client/LoadingBlocker';
import { ImageContainerDto } from '@/schemas/imageContainer';
import { faClose, faImage, faLink, faRefresh, faSave, faSquare, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, OutlinedInput, Stack, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

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
    //update file container data
    return await updateFileContainerData(code, key);
}

const updateFileContainerData = async (code: string, key?: string, title?: string, buttonLabel?: string, link?: string) => {
    //add http to link if not exists
    if(link && !link.startsWith("http://") && !link.startsWith("https://")){
        link = `http://${link}`;
    }

    //get presigner url from server
    const presignedUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/content-manager/image-container/upload-image-container`, {
        method: 'POST',
        body: JSON.stringify({
            code: code,
            key: key,
            title: title,
            buttonLabel: buttonLabel,
            link: link
        })
    });
    if (!presignedUrlResponse.ok) {
        throw new Error("Error al actualizar la imagen");
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
    const router = useRouter();

    const uploadFileAction = (file: File) => {
        setIsLoading(true);
        uploadFile(file, code).then((imageContainer) => {
            setFile(imageContainer);
            setFileToUpload(null);
            //show success message
            enqueueSnackbar('Imagen actualizada correctamente', { variant: 'success' });
            router.refresh();
        }).catch((error) => {
            enqueueSnackbar('Error al actualizar la imagen', { variant: 'error' });
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

    const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<{
        title: string;
        buttonLabel: string;
        link: string;
    }>({
        defaultValues: {
            title: file?.title,
            buttonLabel: file?.buttonLabel,
            link: file?.link,
        }
    });

    useEffect(() => {
        getImageContainer(code).then((imageContainer: ImageContainerDto) => {
            setFile(imageContainer);
            reset({
                title: imageContainer.title,
                buttonLabel: imageContainer.buttonLabel,
                link: imageContainer.link
            });
            fetch(imageContainer.image).then((response) => {
                return response.blob();
            }).then((blob) => {
                const file = new File([blob], imageContainer.key, { type: blob.type });
                setPreview(file);
            }).catch((error) => {
                enqueueSnackbar('Error al obtener la imagen', { variant: 'error' });
                console.log("error", error);
            });
        }).catch((error) => {
            console.log("error", error);
        });
    }, [code, reset]);
    
    const onSubmit = async (data: { title: string, buttonLabel: string, link: string }) => {
        setIsLoading(true);
        const { title, buttonLabel, link } = data;
        updateFileContainerData(code, file?.key, title, buttonLabel, link).then((imageContainer) => {
            setFile(imageContainer);
            //show success message
            enqueueSnackbar('Imagen actualizada correctamente', { variant: 'success' });
            //reset form
            reset({
                title: imageContainer.title,
                buttonLabel: imageContainer.buttonLabel,
                link: imageContainer.link
            });
            router.refresh();
        }).catch((error) => {
            enqueueSnackbar('Error al actualizar la imagen', { variant: 'error' });
            console.log("error", error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

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
        <div className='grid-col-1 border rounded p-2 max-w-sm'>
            <Typography className='uppercase font-bold'><FontAwesomeIcon icon={faImage} className='mr-1'/>{code}</Typography>
            {file ?
                <Image id={`image-${file.key}`} width={width} height={height} src={file.image} alt="preview image" />
            :
                <Image id={`image-${code}`} width={width} height={height} src={`http://dummyimage.com/${width}x${height}/322F30/EFE6D9.jpg`} alt="preview image" />
            }
            <Box className='flex justify-center'>
                <Tooltip title="Cargar imagen">
                    <Button size='small' variant='outlined' onClick={() => inputFileRef.current?.click()} className='mb-1 mt-2 p-2'>
                        <Stack>
                            <Typography variant='caption' className='mt-0.5'>
                                Cargar imagen
                            </Typography>
                        </Stack>
                        <FontAwesomeIcon icon={faImage} className='ml-2' />
                        <FontAwesomeIcon icon={faUpload} className='ml-2' />
                    </Button>
                </Tooltip>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="flex flex-col items-start">
                    <OutlinedInput 
                        className='mt-2'
                        size='small'
                        fullWidth
                        placeholder='Titulo...'
                        {...register("title")}
                        error={!!errors.title}
                    />
                    <OutlinedInput 
                        className='mt-2'
                        size='small'
                        fullWidth
                        startAdornment={<InputAdornment position="start"><FontAwesomeIcon icon={faLink} /></InputAdornment>} placeholder='Enlace...'
                        {...register("link")}
                        error={!!errors.link}
                    />
                    <OutlinedInput 
                        className='mt-2'
                        size='small'
                        fullWidth
                        startAdornment={<InputAdornment position="start"><FontAwesomeIcon icon={faSquare} /></InputAdornment>} placeholder='Texto del botón...'
                        {...register("buttonLabel")}
                        error={!!errors.buttonLabel}
                    />
                    <Box className='flex justify-end'>
                        <Button type="submit" disabled={!isDirty} className='mt-2' variant='outlined' startIcon={<FontAwesomeIcon icon={faSave} />} size='small'>
                            <Typography variant='caption' className='mt-0.5'>Guardar</Typography>
                        </Button>
                    </Box>
                </Box>
            </form>
        </div>
    </>)
}