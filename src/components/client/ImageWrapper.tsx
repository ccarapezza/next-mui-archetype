import { StaticImport, PlaceholderValue, OnLoadingComplete } from 'next/dist/shared/lib/get-img-props';
import Image, { ImageLoader } from 'next/image'
import React, { useState } from 'react'

function ImageWrapper(props: React.JSX.IntrinsicAttributes & Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"> & { src: string | StaticImport; alt: string; width?: number | `${number}` | undefined; height?: number | `${number}` | undefined; fill?: boolean | undefined; loader?: ImageLoader | undefined; quality?: number | `${number}` | undefined; priority?: boolean | undefined; loading?: "eager" | "lazy" | undefined; placeholder?: PlaceholderValue | undefined; blurDataURL?: string | undefined; unoptimized?: boolean | undefined; onLoadingComplete?: OnLoadingComplete | undefined; layout?: string | undefined; objectFit?: string | undefined; objectPosition?: string | undefined; lazyBoundary?: string | undefined; lazyRoot?: string | undefined; } & React.RefAttributes<HTMLImageElement | null>) {
    const [loading, setLoading] = useState<Boolean>(true);
        return (<>
        {loading && <div className="absolute inset-0 bg-gray-100">COMO??????</div>}
        <Image {...props} onLoad={
            (event) => {
                setLoading(false);
                if(props.onLoad) props.onLoad(event);
            }
        } className={props.className + (loading ? " opacity-0" : " opacity-100")
    } />
        </>
    );
}

export default ImageWrapper