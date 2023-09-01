//Service object for SliderImage Sequelize Model
import SliderImage from "@/db/models/SliderImage";
import { GenericService } from "./GenericService";
import { SliderImageDto } from "@/schemas/sliderImage";
import S3BucketUtil from "@/utils/S3BucketUtil";

//SliderImageService extends GenericService
export class SliderImageService extends GenericService<SliderImage> {
    constructor() {
        super(SliderImage);
    }
    deleteByKey = async (key: string) => {
        const where = {
            key: key
        }
        return await this.model.destroy({
            where,
        });
    };
    getVisibleImages = async () => {
        const where = {
            visible: true
        }
        const sliderImages = await this.model.findAll({
            where,
        });
        const sliderImagesDto = await sliderImages.map(async (sliderImage) => {
            const sliderDto = sliderImage.toJSON<SliderImageDto>();
            sliderDto.image = await S3BucketUtil.getSignedUrlByKey({
                key: sliderDto.key,
                folder: S3BucketUtil.FOLDERS.MAIN_SLIDER,
            });
            return sliderDto;
        });
        return sliderImagesDto;
    };
    //Update an item
    updateByKey = async (key: string, item: any) => {
        const where = {
            key: key
        }
        return await this.model.update(
            item,
            {
                where
            }
        );
    };
};

//SliderImageService as a singleton
export const sliderImageService = new SliderImageService();