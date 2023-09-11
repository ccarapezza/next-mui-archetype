import ImageCropEditor from '@/components/client/ImageCropEditor';
import LoadingBlocker from '@/components/client/LoadingBlocker';
import { ImageProductDto } from '@/schemas/productItem';
import { faClose, faImage, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

const compressedSizes = {
    width: 548,
    height: 850
}

const uploadFile = async (file: File) => {
    //get presigner url from server
    const presignedUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/product/upload-temp-image-product/jpg`, {
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
    return key;
}

const deleteFile = async (key: string) => {
    //get presigner url from server
    const presignedUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/product/delete-temp-image-product/${key}`, {
        method: 'DELETE',
    });
    if (!presignedUrlResponse.ok) {
        throw new Error("Error al obtener la url de subida");
    }
    return await presignedUrlResponse.json();
}

export default function ProductItemImages({defaultFiles = [], onChange, name, setLoading}: {defaultFiles?: ImageProductDto[], onChange: Function, name: string, setLoading?: Function}) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [fileToUpload, setFileToUpload] = useState<File|null>(null);
    const [preview, setPreview] = useState<File|null>(null);
    const [files, setFiles] = useState<ImageFile[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if(defaultFiles){
            const processImages = async (images: ImageProductDto[]) => {
                return await Promise.all(images.map(async (image, index) => {
                    const response = await fetch(image.url);
                    if (!response.ok) {
                        throw new Error("Error al obtener la imagen");
                    }
                    const blob = await response.blob();
                    const file = new File([blob], image.key, { type: blob.type });
                    return {
                        itemIndex: index,
                        file: file,
                        key: image.key
                    }
                }));
            }

            setIsLoading(true);
            processImages(defaultFiles).then((files) => {
                setFiles(files);
            }).catch((error) => {
                console.log("error", error);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, []);

    const addFile = (file: File, itemId: number) => {
        setIsLoading(true);
        uploadFile(file).then((key) => {
            setFiles([...files, {
                itemIndex: itemId,
                file: file,
                key: key
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

    useEffect(() => {
        if(setLoading){
            setLoading(isLoading);
        }
    }, [isLoading, setLoading]);

    return (<>
        {!setLoading && isLoading &&
            <LoadingBlocker />
        }
        <Dialog open={!!fileToUpload} onClose={() => setFileToUpload(null)}>
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
                        compressedWidth={compressedSizes.width}
                        compressedHeight={compressedSizes.height}
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
        <div className='grid grid-cols-6 gap-2 items-center mb-4'>
            {files.map((file, index) => (<div className='grid-col-1 border rounded p-2' key={name+"-"+index}>
                <Image id={`image-${index}`} width={compressedSizes.width} height={compressedSizes.height} src={URL.createObjectURL(file.file as Blob)} alt="preview image" />
                <FontAwesomeIcon className='text-red-500 cursor-pointer mt-2' icon={faTrash} onClick={() => removeFile(index)} />
            </div>))}
            <div>
                <Tooltip title="Agregar imagen">
                    <Button variant='outlined' onClick={() => inputFileRef.current?.click()} className='mb-4 p-4'>
                        <FontAwesomeIcon icon={faPlus} className='mr-2' />
                        <FontAwesomeIcon icon={faImage} />
                    </Button>
                </Tooltip>
            </div>
        </div>
    </>)
}
