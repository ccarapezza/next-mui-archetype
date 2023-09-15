import S3BucketUtil from "@/utils/S3BucketUtil";
import { sliderImageService } from "./SliderImageService";
import { SliderImageDto } from "@/schemas/sliderImage";

export class MainSliderService  {
    async getListOfMainSliderImages() {
        let sliders = await sliderImageService.getAll();
        const slidersDto = await Promise.all(sliders.map(async (slider) => {
            const sliderDto = slider.toJSON<SliderImageDto>();
            sliderDto.image = await S3BucketUtil.getSignedUrlByKey({
                key: sliderDto.key,
                folder: S3BucketUtil.FOLDERS.MAIN_SLIDER,
            });
            return sliderDto;
        }));

        return slidersDto;
    }
};

//VariationService as a singleton
export const mainSliderService = new MainSliderService();