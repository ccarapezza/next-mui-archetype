'use client'
import PriceFormatting from "@/components/management/product/PriceFormatting";
import { ProductDto } from "@/schemas/product";
import { ProductItemDto } from "@/schemas/productItem";
import draftToHtml from "draftjs-to-html";
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { useState } from "react";
import { ContentState } from "react-draft-wysiwyg";

export default function ProductHeader(props: { product: ProductDto | null, selectedItem: ProductItemDto }) {
  const { product, selectedItem } = props;
  let jsonObj = JSON.parse(product?.description?product?.description:"");
  
  const html = draftToHtml(convertToRaw(EditorState.createWithContent(convertFromRaw(jsonObj)).getCurrentContent()));
  const DescriptionDisplay = () => {
    return (<div className="text-tertiary reactWysiwygContainer" dangerouslySetInnerHTML={{ __html: html}}></div>)
  }
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-tertiary lg:text-3xl">{product?.name}</h1>
        <p className="mt-1 text-sm text-gray-500">SKU: {selectedItem.sku}</p>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-primary"><PriceFormatting value={selectedItem.price} /></p>
      </div>
      <div className="mt-4">
        <div className="max-w-none">
            <DescriptionDisplay />
        </div>
      </div>
    </>
  )
}
