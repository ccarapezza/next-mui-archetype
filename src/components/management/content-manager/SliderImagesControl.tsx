'use client';
import ImageCropEditor from '@/components/client/ImageCropEditor';
import LoadingBlocker from '@/components/client/LoadingBlocker';
import { SliderImageDto } from '@/schemas/sliderImage';
import { faClose, faEye, faImage, faLink, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Card, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, OutlinedInput, Switch, TextField, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';

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

const updateFile = async (key: string, link: string, visible: boolean = true) => {
    //add http if link not starts with http or https
    if (link && !link.startsWith('http://') && !link.startsWith('https://')) {
        link = `http://${link}`;
    }
    //get presigner url from server
    const presignedUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/content-manager/main-slider/update-image-slider`, {
        method: 'PUT',
        body: JSON.stringify({
            key: key,
            link: link,
            visible: visible
        })
    });
    if (!presignedUrlResponse.ok) {
        throw new Error("Error al actualizar la imagen");
    }
    return await presignedUrlResponse.json();
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
    const router = useRouter();

    const addFile = (file: File, itemId: number) => {
        setIsLoading(true);
        uploadFile(file).then((sliderImage) => {
            setFiles([...files, {
                ...sliderImage
            }]);
            setFileToUpload(null);
            router.refresh();
            enqueueSnackbar('Imagen agregada', { variant: 'success' });
        }).catch((error) => {
            console.log("error", error);
            enqueueSnackbar('Error al agregar la imagen', { variant: 'error' });
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const removeFile = (fileIndex: number) => {
        setIsLoading(true);
        deleteFile(files[fileIndex].key).then((response) => {
            setFiles(files!.filter((file, index) => index !== fileIndex));
            router.refresh();
            enqueueSnackbar('Imagen eliminada', { variant: 'success' });
        }).catch((error) => {
            enqueueSnackbar('Error al eliminar la imagen', { variant: 'error' });
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
    

    const FormSliderImage = ({file, index}: {file: SliderImageDto, index: number}) => {
        const { control, register, handleSubmit, formState: { errors, isDirty } } = useForm<{
            link: string;
            visible: boolean;
        }>({
            defaultValues: {
                link: file?.link,
                visible: file?.visible
            }
        });

        const onSubmit = (data: {link: string, visible: boolean}) => {
            setIsLoading(true);
            updateFile(file.key, data.link, data.visible).then((response) => {
                setFiles(files.map((file, i) => {
                    if (i === index) {
                        return {
                            ...file,
                            link: data.link,
                            visible: data.visible
                        }
                    }
                    return file;
                }));
                enqueueSnackbar('Imagen actualizada', { variant: 'success' });
                router.refresh();
            }).catch((error) => {
                enqueueSnackbar('Error al actualizar la imagen', { variant: 'error' });
                console.log("error", error);
            }).finally(() => {
                setIsLoading(false);
            });
        }

        const submitButtonRef = useRef<HTMLButtonElement>(null);
        //form ref
        const formRef = useRef<HTMLFormElement>(null);

        const handleLinkChange = () => {
            formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }

        return (<div className='grid-col-1 border rounded p-2 max-w-4xl'>
            <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                <Image id={`image-${file.key}`} width={1920} height={450} src={file.image} alt="preview image" />
                <Box className="flex flex-col items-start">
                <OutlinedInput 
                        className='mt-2'
                        size='small'
                        fullWidth
                        startAdornment={<InputAdornment position="start"><FontAwesomeIcon icon={faLink} /></InputAdornment>} placeholder='Enlace...'
                        {...register("link")}
                        error={!!errors.link}
                    />
                    <Box className="flex items-center justify-center mt-2 ml-1">
                        <Box className="flex items-center">
                            <FontAwesomeIcon icon={faEye} /><Typography component="span" variant='subtitle2' className='ml-2'>Visible: </Typography>
                        </Box>
                        <Controller
                            control={control}
                            name="visible"
                            defaultValue={false}
                            render={({
                                field: { onChange, value },
                            }) => {
                                return (
                                    <Switch
                                        size='small'
                                        color='primary'
                                        checked={value}
                                        onChange={(e) => {
                                            onChange(e.target.checked);
                                            handleLinkChange();
                                        }}
                                    />
                                );
                            }}
                        />
                    </Box>
                    <Box className='flex justify-between w-full'>
                        <Button className='mt-2' color='error' variant='outlined' startIcon={<FontAwesomeIcon className='text-red-500 cursor-pointer' icon={faTrash} />} size='small' onClick={() => removeFile(index)}>
                            <Typography variant='caption' className='mt-0.5'>Eliminar</Typography>
                        </Button>
                        <Button ref={submitButtonRef} type="submit" disabled={!isDirty} className='mt-2' variant='outlined' startIcon={<FontAwesomeIcon icon={faSave} />} size='small'>
                            <Typography variant='caption' className='mt-0.5'>Guardar</Typography>
                        </Button>
                    </Box>
                </Box>
            </form>
        </div>)
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
        <Box className='p-4 mb-4 flex justify-center'>
            <div className='grid grid-cols-1 gap-2 items-center mb-4'>
                {files.map((file, index) => (
                    <FormSliderImage key={file.key} file={file} index={index} />
                ))}
                <div>
                    <Tooltip title="Agregar imagen">
                        <Button size='small' variant='contained' onClick={() => inputFileRef.current?.click()} className='mb-4 p-2' fullWidth>
                            <Typography variant='caption' className='mt-0.5'>
                                Agregar imagen
                            </Typography>
                            <FontAwesomeIcon icon={faImage} className='ml-2' />
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </Box>
    </>)
}