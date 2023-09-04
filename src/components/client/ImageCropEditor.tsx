"use client"
import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faRotate } from '@fortawesome/free-solid-svg-icons';
import { Button, Slider, Typography } from '@mui/material';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { canvasPreview } from './crop/canvasPreview';
import Image from 'next/image';
import { compressAccurately, EImageType } from 'image-conversion';

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

export default function ImageCropEditor({
    file,
    setFormatedFile,
    minWidth = 10,
    minHeight = 10,
    compressedWidth = 548,
    compressedHeight = 850,
    compressedSizeOnKb = 60,
}: { file: File, setFormatedFile: Function, minWidth?: number, minHeight?: number, compressedWidth?: number, compressedHeight?: number, compressedSizeOnKb?: number }) {
    const [imgSrc, setImgSrc] = useState('');
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [selectedFileAspect, setSelectedFileAspect] = useState<number>(0);

    const calculatedAspect = compressedWidth / compressedHeight;
    const imageSizeRenderer = Math.max(compressedWidth, compressedHeight);

    useEffect(() => {
        if (file) {
            onSelectFile(file)
        }
    }, [file]);

    function onSelectFile(file: File) {
        setCrop(undefined) // Makes crop preview update between images.
        const reader = new FileReader()
        reader.addEventListener('load', () =>{
            setImgSrc(reader.result?.toString() || '');

            const img = document.createElement("img");
            img.onload = () => {
                // Natural size is the actual image size regardless of rendering.
                // The 'normal' `width`/`height` are for the **rendered** size.
                const width  = img.naturalWidth;
                const height = img.naturalHeight; 
                setSelectedFileAspect(width / height);
    
                console.log(`Image size: ${width}x${height}`);
            };
            img.src = reader.result?.toString() || '';
        })
        reader.readAsDataURL(file)
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (calculatedAspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, calculatedAspect))
        }
    }

    async function handleUploadCrop() {
        if (imgRef.current && completedCrop && previewCanvasRef.current) {
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
                if (setFormatedFile) {
                    //TODO: Check image compression parameters
                    const compressBlob = await compressAccurately(blob, {
                        size: compressedSizeOnKb,
                        accuracy: 0.9,
                        type: EImageType.JPEG,//the type of compressed image, default jpeg;
                        width: compressedWidth,
                        height: compressedHeight,
                    })

                    setFormatedFile(compressBlob);
                }
            })
        }
    }

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setScale(newValue as number);
    };

    if(selectedFileAspect==0){
        return <div className="App">Cargando...</div>
    }

    return (
        <div className="App">
            {!!imgSrc && (
                <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    keepSelection={true}
                    aspect={calculatedAspect}
                    minWidth={minWidth}
                    minHeight={minHeight}
                    >
                    <Image
                        className={selectedFileAspect > 1 ? 'h-auto w-[520px]':'h-[420px] w-auto' }
                        width={imageSizeRenderer}
                        height={imageSizeRenderer}
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
                    <FontAwesomeIcon icon={faMagnifyingGlass} /><Typography className='px-2' component={"span"}>Zoom</Typography>
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
                    <FontAwesomeIcon icon={faRotate} /><Typography className='px-2' component={"span"}>Rotar</Typography>
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
            <canvas ref={previewCanvasRef} className='hidden'  style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop?.width,
                height: completedCrop?.height,
            }} />
            <Button variant='outlined' onClick={() => { handleUploadCrop() }} autoFocus className='float-right'>
                Guardar
            </Button>

        </div>
    )
}
