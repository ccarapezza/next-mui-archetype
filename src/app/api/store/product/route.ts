import { Product, ProductCategory, ProductItem, Variation, VariationOption, sequelizeInstace } from '@/db';
import findAllSequelizePagination from '@/db/utils/pagination';
import { VariationDto } from '@/schemas/variation';
import { VariationOptionDto } from '@/schemas/variationOption';
import S3BucketUtil from '@/utils/S3BucketUtil';
import { NextRequest, NextResponse } from 'next/server'
import { QueryTypes } from 'sequelize';

export async function GET(request: NextRequest) {
    const id = parseInt(request.nextUrl.searchParams.get("id")!);

    //obtain product by id

    return NextResponse.json([]);
}