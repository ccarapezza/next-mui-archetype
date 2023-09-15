'use client';
import ImageCropEditor from '@/components/client/ImageCropEditor';
import LoadingBlocker from '@/components/client/LoadingBlocker';
import { ImageContainerDto } from '@/schemas/imageContainer';
import { faCamera, faClose, faImage, faLink, faRefresh, faSave, faSquare, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, OutlinedInput, Stack, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const uploadFile = async (file: File) => {
    //get presigner url from server
    const presignedUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/my-profile/upload-avatar/jpg`, {
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
    return await updateAvatarData(key);
}

const updateAvatarData = async (key?: string) => {
    //get presigner url from server
    const presignedUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/my-profile/update-avatar`, {
        method: 'PUT',
        body: JSON.stringify({ key }),
        headers: {
            'Content-Type': 'application/json'
        }
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

export default function MyProfileAvatarControl({avatarImage, size:{ width = 774, height = 1161}, compressedSizeOnKb=150, name, title}: {avatarImage: string, size: {width: number, height: number}, name: string, compressedSizeOnKb?: number, title?: string}) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [fileToUpload, setFileToUpload] = useState<File|null>(null);
    const [preview, setPreview] = useState<File|null>(null);
    const [file, setFile] = useState<File|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if(avatarImage){
            const processImage = async (imageUrl: string) => {
                const response = await fetch(imageUrl);
                if (!response.ok) {
                    throw new Error("Error al obtener la imagen");
                }
                const blob = await response.blob();
                const file = new File([blob], imageUrl, { type: blob.type });
                return file;
            }

            setIsLoading(true);
            processImage(avatarImage).then((file) => {
                setFile(file);
            }).catch((error) => {
                console.log("error", error);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, [avatarImage]);

    const uploadFileAction = (file: File) => {
        setIsLoading(true);
        uploadFile(file).then((imageContainer) => {
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
        
        <Box className="w-fit relative ">
            <Avatar alt="User Avatar" className='h-32 w-32 drop-shadow-md'>
                {file ?
                    <Image id={`image-${file}`} width={width} height={height} src={avatarImage} alt="preview image" />
                :
                    <FontAwesomeIcon icon={faUser} size="2x"/>
                }
            </Avatar>
            <Tooltip title={"Cambiar avatar"}>
                <IconButton onClick={() => { document.getElementById("my-file-selector")?.click() }} className='bg-blue-300 absolute bottom-0 end-0 drop-shadow-xl'>
                    <input
                        id="my-file-selector"
                        ref={inputFileRef}
                        type="file"
                        name={name}
                        multiple={false}
                        accept="image/png, image/jpeg"
                        className='hidden'
                        onChange={(e) => e.target.files?.length! > 0 && setFileToUpload(e.target.files![0])}
                    />
                    <FontAwesomeIcon fixedWidth icon={faCamera} className='w-5 h-5' />
                </IconButton>
            </Tooltip>
        </Box>
    </>)
}