import S3BucketUtil from "@/utils/S3BucketUtil";

export class MainSliderService  {
    getListOfMainSliderImages() {
        return S3BucketUtil.getSignedUrlsByFolder({
            folder: S3BucketUtil.FOLDERS.MAIN_SLIDER,
        });
    }
};

//VariationService as a singleton
export const mainSliderService = new MainSliderService();