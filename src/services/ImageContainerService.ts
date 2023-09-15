//Service object for ImageContainer Sequelize Model
import { ImageContainer } from "@/db";
import { GenericService } from "./GenericService";
import S3BucketUtil from "@/utils/S3BucketUtil";
import { ImageContainerDto } from "@/schemas/imageContainer";

//ImageContainer extends GenericService
export class ImageContainerService extends GenericService<ImageContainer> {
    constructor() {
        super(ImageContainer);
    }
    deleteByKey = async (key: string) => {
        const where = {
            key: key
        }
        return await this.model.destroy({
            where,
        });
    };
    deleteByCode = async (code: string) => {
        const where = {
            code: code
        }
        return await this.model.destroy({
            where,
        });
    }
    getDtoByCode = async (code: string) => {       
        const containerImage = await this.getByCode(code);
        const imageContainerDto = containerImage?.toJSON<ImageContainerDto>();
        if(imageContainerDto){
            imageContainerDto.image = await S3BucketUtil.getSignedUrlByKey({
                key: imageContainerDto.key,
                folder: S3BucketUtil.FOLDERS.IMAGE_CONTAINER,
            });
        }
        return imageContainerDto;
    }
    getByCode = async (code: string) => {
        const where = {
            code: code
        }
        const containerImage = await this.model.findOne({
            where,
        });
        
        return containerImage;
    }
    getDtoByCodes = async (codes: string[]) => {
        const imageContainer = await this.getByCodes(codes);
        const imageContainerDto = Promise.all(imageContainer.map(async (imageContainer) => {
            const imageContainerDto = imageContainer.toJSON<ImageContainerDto>();
            imageContainerDto.image = await S3BucketUtil.getSignedUrlByKey({
                key: imageContainerDto.key,
                folder: S3BucketUtil.FOLDERS.IMAGE_CONTAINER,
            });
            return imageContainerDto;
        }));
        return imageContainerDto;
    }
    getByCodes = async (codes: string[]) => {
        const where = {
            code: codes
        }
        const imageContainer = await this.model.findAll({
            where,
        });
        return imageContainer;
    }
    //Update an item
    updateKeyByCode = async (code: string, key: string) => {
        const where = {
            code: code
        }
        const update = {
            key: key
        }
        return await this.model.update(update, {
            where,
        });
    };
};

//ImageContainerService as a singleton
export const imageContainerService = new ImageContainerService();