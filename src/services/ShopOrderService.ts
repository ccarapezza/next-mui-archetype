//Service object for Role Sequelize Model
import { ContactForm, OrderLine, ProductItem, ShopOrder, VariationOption } from "@/db";
import findAllSequelizePagination from "@/db/utils/pagination";
import { GenericService } from "./GenericService";
import S3BucketUtil from "@/utils/S3BucketUtil";

//VariationService extends GenericService
export class ShopOrderService extends GenericService<ShopOrder> {
    constructor() {
        super(ShopOrder);
    }
    getPendingOrders = async (page: number = 1, size: number = 10) => {
        const data = await findAllSequelizePagination(
            {
                model: ShopOrder,
                page: page,
                size: size,
                include: [
                    {
                        model: OrderLine,
                        include: [
                            {
                                model: ProductItem,
                                include: [
                                    "masterProduct",
                                    {
                                        model: VariationOption,
                                        include: ["variation"]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: ContactForm,
                        attributes: ["id", "name", "lastName", "email", "phone"],
                    }
                ],
                where: {
                    statusId: 1
                },
                order: [["createdAt", "DESC"]],
            }
        );

        const rows = []

        for (const shopOrder of data.rows) {
            let shopOrderDto = shopOrder as any;
            for(let i=0;i<shopOrderDto.orderLines.length;i++){
                const images = shopOrderDto.orderLines[i].item.image?(shopOrderDto.orderLines[i].item.image as string[]):[];
                if(images && images?.length!>0){
                    for (let j = 0; j < images?.length!; j++) {
                        images[j] = await S3BucketUtil.getSignedUrlByKey({ key: images[j], folder: S3BucketUtil.FOLDERS.PRODUCT_IMAGES });
                    }
                    shopOrderDto.orderLines[i].item.images = images;
                    shopOrderDto.contactForm = shopOrderDto.contactForm;

                }
            }
            rows.push(shopOrderDto);
        }
        return {
            ...data,
            rows: rows
        };
    };
    moveToStatus = async (id: number, statusId: number) => {
        const shopOrder = await ShopOrder.findByPk(id);
        console.log("shopOrder", shopOrder);
        console.log("statusId", statusId);
        if (shopOrder) {
            shopOrder.statusId = statusId;
            await shopOrder.save();
            return shopOrder;
        }
        return null;
    }
};

//VariationService as a singleton
export const shopOrderService = new ShopOrderService();