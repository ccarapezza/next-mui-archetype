"use client"
import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faRotate } from '@fortawesome/free-solid-svg-icons';
import { Button, Slider, Typography } from '@mui/material';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { canvasPreview } from './crop/canvasPreview';
import Image from 'next/image';
import {compressAccurately} from 'image-conversion';
import { EImageType } from 'lib-image-conversion';

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

export default function ImageCropEditor({ file, setFormatedFile }: { file: File, setFormatedFile: Function }) {
    const [imgSrc, setImgSrc] = useState('')
    const imgRef = useRef<HTMLImageElement>(null)
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState<number | undefined>(1 / 1);

    useEffect(() => {
        if (file) {
            onSelectFile(file)
        }
    }, [file]);

    function onSelectFile(file: File) {
        setCrop(undefined) // Makes crop preview update between images.
        const reader = new FileReader()
        reader.addEventListener('load', () =>
            setImgSrc(reader.result?.toString() || ''),
        )
        reader.readAsDataURL(file)
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    async function handleUploadCrop() {
        if(imgRef.current && completedCrop && previewCanvasRef.current) {
            await canvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                completedCrop,
                scale,
                rotate,
            );
            previewCanvasRef.current.toBlob(async (blob) => {
                if (!blob) {
                    throw new Error('Failed to create blob')
                }
                if(setFormatedFile){

                    const compressBlob = await compressAccurately(blob,{
                        size: 60,    // 100kb
                        accuracy: 0.9,
                        type: EImageType.JPEG,//the type of compressed image, default jpeg;
                        width: 840,
                        height: 840
                    })

                    setFormatedFile(compressBlob);
                }
            })
        }
    }

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setScale(newValue as number);
    };

    return (
        <div className="App">
            {!!imgSrc && (
                <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    keepSelection={true}
                    aspect={aspect}
                    minWidth={150}
                    minHeight={150}
                >
                    <Image
                        width={840}
                        height={840}
                        className='w-full h-full'
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}
            <div className="Crop-Controls py-2 px-8">
                <div>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/><Typography className='px-2' component={"span"}>Zoom</Typography>
                    <Slider
                        size='small'
                        id="scale-input"
                        aria-label="Scale"                       
                        value={scale}
                        max={3}
                        min={0.2}
                        step={0.01}
                        onChange={handleSliderChange}
                    />
                </div>
                <div>
                    <FontAwesomeIcon icon={faRotate}/><Typography className='px-2' component={"span"}>Rotar</Typography>
                    <Slider
                        id="rotate-input"
                        aria-label="Rotate"                       
                        size='small'
                        value={rotate}
                        max={360}
                        min={0}
                        step={1}
                        onChange={(e, newValue) => {
                            setRotate(newValue as number)
                        }}
                        color="secondary"
                    />
                </div>
            </div>
            <canvas ref={previewCanvasRef} className='hidden' />
            <Button variant='outlined' onClick={() => { handleUploadCrop() }} autoFocus className='float-right'>
                Guardar
            </Button>

        </div>
    )
}
