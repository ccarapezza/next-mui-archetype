"use client"
import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@mui/material';
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useDebounceEffect } from './crop/useDebounceEffect';
import { canvasPreview } from './crop/canvasPreview';
import Image from 'next/image';

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export default function AvatarUploadModal({src}: {src: string} ) {
    const [open, setOpen] = useState(false)
    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
    const blobUrlRef = useRef('')
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState<number | undefined>(1 / 1)

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setOpen(true);
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    function onDownloadCropClick() {
        if (!previewCanvasRef.current) {
            throw new Error('Crop canvas does not exist')
        }

        previewCanvasRef.current.toBlob((blob) => {
            if (!blob) {
                throw new Error('Failed to create blob')
            }
            if (blobUrlRef.current) {
                URL.revokeObjectURL(blobUrlRef.current)
            }
            blobUrlRef.current = URL.createObjectURL(blob)
            hiddenAnchorRef.current!.href = blobUrlRef.current
            hiddenAnchorRef.current!.click()
        })
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate],
    )

    function deleteAvatar() {
        
    }

    function handleUploadCrop() {
        
    }

    return (
        <>
            <div className={"text-center align-self-center m-1"}>
                <Box className="w-fit relative ">
                    <Avatar alt="User Avatar" className='h-32 w-32' src={src}>
                        CC
                    </Avatar>
                    <IconButton onClick={() => deleteAvatar()} className='bg-red-500 absolute bottom-0 start-0 shadow drop-shadow-md'>
                        <FontAwesomeIcon fixedWidth icon={faTrash} className='w-5 h-5' />
                    </IconButton>
                    <IconButton onClick={() => { document.getElementById("my-file-selector")?.click() }} className='bg-blue-500 absolute bottom-0 end-0 drop-shadow-md'>
                        <input autoComplete="off" id="my-file-selector" className="hidden" type="file" accept="image/*" onChange={onSelectFile} />
                        <FontAwesomeIcon fixedWidth icon={faCamera} className='w-5 h-5' />
                    </IconButton>

                </Box>
            </div>
            <Dialog
                open={open}
                onClose={() => { }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-content"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Actualizar Avatar"}
                </DialogTitle>
                <DialogContent>
                    <DialogContent id="alert-dialog-content">
                        <div className="App">
                            <div className="Crop-Controls">
                                <div>
                                    <label htmlFor="scale-input">Scale: </label>
                                    <input
                                        id="scale-input"
                                        type="number"
                                        step="0.1"
                                        value={scale}
                                        disabled={!imgSrc}
                                        onChange={(e) => setScale(Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="rotate-input">Rotate: </label>
                                    <input
                                        id="rotate-input"
                                        type="number"
                                        value={rotate}
                                        disabled={!imgSrc}
                                        onChange={(e) =>
                                            setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
                                        }
                                    />
                                </div>
                            </div>
                            {!!imgSrc && (
                                <ReactCrop
                                    crop={crop}
                                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                                    onComplete={(c) => setCompletedCrop(c)}
                                    aspect={aspect}
                                >
                                    <Image
                                        ref={imgRef}
                                        alt="Crop me"
                                        src={imgSrc}
                                        style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                                        onLoad={onImageLoad}
                                    />
                                </ReactCrop>
                            )}
                            {!!completedCrop && (
                                <>
                                    <div>
                                        <canvas
                                            ref={previewCanvasRef}
                                            style={{
                                                border: '1px solid black',
                                                objectFit: 'contain',
                                                width: completedCrop.width,
                                                height: completedCrop.height,
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <button onClick={onDownloadCropClick}>Download Crop</button>
                                        <a
                                            ref={hiddenAnchorRef}
                                            download
                                            style={{
                                                position: 'absolute',
                                                top: '-200vh',
                                                visibility: 'hidden',
                                            }}
                                        >
                                            Hidden download
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false); setImgSrc(""); }}>Close</Button>
                    <Button onClick={() => { handleUploadCrop() }} autoFocus>
                        Save Avatar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
