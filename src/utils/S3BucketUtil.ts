import { S3Client, GetObjectCommand, PutObjectCommand, CopyObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { compressAccurately, EImageType } from "image-conversion";

const thumbnailSizeOnKb = 10;
const thumbnailWidth = 192;

const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const FOLDERS = {
    MAIN_SLIDER: 'main-slider',
    PRODUCT_IMAGES: 'product-images',
    IMAGE_CONTAINER: 'images',
    TEMP: 'temp',
};

async function createThumbnail({ key, folder = '' }: { key: string; folder?: string; }) {
    if(folder){
        folder = `${folder}/`;
    }
    const input = { // GetObjectRequest
        Bucket: process.env.AWS_S3_BUCKET_NAME, // required
        Key: `${folder}${key}`, // required
    };
    const command = new GetObjectCommand(input);
    const result = await client.send(command);
    //creating thumbnail with image-conversion library
    const res = await result.Body?.transformToByteArray();
    if(res){
        const blob = new Blob([res], { type: result.ContentType });
        const compressBlob = await compressAccurately(blob, {
            size: thumbnailSizeOnKb,
            accuracy: 0.9,
            type: EImageType.JPEG,
            width: thumbnailWidth
        })
        const thumbnailKey = `thumbnail-${key}`;
        const thumbnailInput = { // PutObjectRequest
            Bucket: process.env.AWS_S3_BUCKET_NAME, // required
            Key: `${folder}${thumbnailKey}`, // required
            Body: compressBlob, // required
        };
        const thumbnailCommand = new PutObjectCommand(thumbnailInput);
        const thumbnailResult = await client.send(thumbnailCommand);
        return thumbnailResult;
    }
}

async function getSignedUrlsByFolder({ folder }: { folder: string; }) {
    const input = { // ListObjectsV2Request
        Bucket: process.env.AWS_S3_BUCKET_NAME, // required
        Prefix: folder, // required
    };
    const command = new ListObjectsV2Command(input);
    const result = await client.send(command);
    const keys = result.Contents?.map((file) => file.Key);
    return await Promise.all(keys?.map((key) => getSignedUrlByKey({ key: key! })) || []);;
}

async function getSignedUrlByKey({ key, folder = '' }: { key: string; folder?: string; }) {
    if(folder){
        folder = `${folder}/`;
    }
    const input = { // GetObjectRequest
        Bucket: process.env.AWS_S3_BUCKET_NAME, // required
        Key: `${folder}${key}`, // required
    };
    const command = new GetObjectCommand(input);
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    return url;
}

async function uploadFile({ key, file, folder='' }: { key: string; file: File; folder: string; }) {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    if(folder){
        folder = `${folder}/`;
    }
    const input = { // PutObjectRequest
        Bucket: process.env.AWS_S3_BUCKET_NAME, // required
        Key: `${folder}${key}`, // required
        Body: buffer, // required
    };
    const command = new PutObjectCommand(input);
    const result = await client.send(command);
    return result;
}

async function getPresignedUploadUrl({key, contentType, folder = ''}: {key: string; contentType: string; folder?: string;}) {
    if(folder){
        folder = `${folder}/`;
    }
    const input = { // PutObjectRequest
        Bucket: process.env.AWS_S3_BUCKET_NAME, // required
        Key: `${folder}${key}`, // required
        ContentType: contentType,
    };
    const command = new PutObjectCommand(input);
    const result = await getSignedUrl(client, command, { expiresIn: 3600 });
    return result;
}

async function renameFile({oldKey, newKey}: {oldKey: string; newKey: string;}) {
    const input = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        CopySource: `${process.env.AWS_S3_BUCKET_NAME}/${oldKey}`,
        Key: newKey,
    };
    const command = new CopyObjectCommand(input);
    const result = await client.send(command);
    await deleteFile({key: oldKey});
    return result;
}

async function deleteFile({key, folder='' }: {key: string; folder?: string;}) {
    if(folder){
        folder = `${folder}/`;
    }
    const input = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${folder}${key}`,
    };
    const command = new DeleteObjectCommand(input);
    const result = await client.send(command);
    return result;
}

const S3BucketUtil = {
    getSignedUrlsByFolder,
    getSignedUrlByKey,
    uploadFile,
    getPresignedUploadUrl,
    renameFile,
    deleteFile,
    FOLDERS: FOLDERS,
}

export default S3BucketUtil;