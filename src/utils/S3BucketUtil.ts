import { S3Client, GetObjectCommand, PutObjectCommand, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

// { // GetObjectOutput
//   Body: "STREAMING_BLOB_VALUE",
//   DeleteMarker: true || false,
//   AcceptRanges: "STRING_VALUE",
//   Expiration: "STRING_VALUE",
//   Restore: "STRING_VALUE",
//   LastModified: new Date("TIMESTAMP"),
//   ContentLength: Number("long"),
//   ETag: "STRING_VALUE",
//   ChecksumCRC32: "STRING_VALUE",
//   ChecksumCRC32C: "STRING_VALUE",
//   ChecksumSHA1: "STRING_VALUE",
//   ChecksumSHA256: "STRING_VALUE",
//   MissingMeta: Number("int"),
//   VersionId: "STRING_VALUE",
//   CacheControl: "STRING_VALUE",
//   ContentDisposition: "STRING_VALUE",
//   ContentEncoding: "STRING_VALUE",
//   ContentLanguage: "STRING_VALUE",
//   ContentRange: "STRING_VALUE",
//   ContentType: "STRING_VALUE",
//   Expires: new Date("TIMESTAMP"),
//   WebsiteRedirectLocation: "STRING_VALUE",
//   ServerSideEncryption: "AES256" || "aws:kms" || "aws:kms:dsse",
//   Metadata: { // Metadata
//     "<keys>": "STRING_VALUE",
//   },
//   SSECustomerAlgorithm: "STRING_VALUE",
//   SSECustomerKeyMD5: "STRING_VALUE",
//   SSEKMSKeyId: "STRING_VALUE",
//   BucketKeyEnabled: true || false,
//   StorageClass: "STANDARD" || "REDUCED_REDUNDANCY" || "STANDARD_IA" || "ONEZONE_IA" || "INTELLIGENT_TIERING" || "GLACIER" || "DEEP_ARCHIVE" || "OUTPOSTS" || "GLACIER_IR" || "SNOW",
//   RequestCharged: "requester",
//   ReplicationStatus: "COMPLETE" || "PENDING" || "FAILED" || "REPLICA",
//   PartsCount: Number("int"),
//   TagCount: Number("int"),
//   ObjectLockMode: "GOVERNANCE" || "COMPLIANCE",
//   ObjectLockRetainUntilDate: new Date("TIMESTAMP"),
//   ObjectLockLegalHoldStatus: "ON" || "OFF",
// };

async function getSignedUrlByKey({ key }: { key: string; }) {
    const input = { // GetObjectRequest
        Bucket: process.env.AWS_S3_BUCKET_NAME, // required
        Key: key, // required
    };
    const command = new GetObjectCommand(input);
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    return url;
}

async function uploadFile({ key, file }: { key: string; file: File; }) {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const input = { // PutObjectRequest
        Bucket: process.env.AWS_S3_BUCKET_NAME, // required
        Key: key, // required
        Body: buffer, // required
    };
    const command = new PutObjectCommand(input);
    const result = await client.send(command);
    return result;
}

async function getPresignedUploadUrl({key, contentType}: {key: string; contentType: string;}) {
    const input = { // PutObjectRequest
        Bucket: process.env.AWS_S3_BUCKET_NAME, // required
        Key: key, // required
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

async function deleteFile({key}: {key: string;}) {
    const input = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
    };
    const command = new DeleteObjectCommand(input);
    const result = await client.send(command);
    return result;
}

const S3BucketUtil = {
    getSignedUrlByKey,
    uploadFile,
    getPresignedUploadUrl,
    renameFile,
    deleteFile,
}

export default S3BucketUtil;