//Service object for Role Sequelize Model
import { ContactForm, OrderLine, OrderStatus, ProductItem, ShopOrder, VariationOption } from "@/db";
import findAllSequelizePagination from "@/db/utils/pagination";
import { GenericService } from "./GenericService";
import S3BucketUtil from "@/utils/S3BucketUtil";
import { AdapterSession } from 'next-auth/adapters';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/authOptions';
import { userService } from "./UserService";
import { Op } from "sequelize";
//VariationService extends GenericService
export class ShopOrderService extends GenericService<ShopOrder> {
    constructor() {
        super(ShopOrder);
    }
    getOrdersByStatus = async (statusId: number, page: number = 1, size: number = 10) => {
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
                    statusId: statusId
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
    };
    getOrderByUserId = async () => {

        const session = await getServerSession(authOptions);
        const user = session?.user?.email ? await userService.getByEmail(session.user.email) : null;
        const key = user?.id;

        const orderListByUserId = await ShopOrder.findAll({
            attributes: ['id', 'statusId', 'orderTotal', 'orderDate'],
            where: {
                userId: {
                    [Op.like]: `%${key}%`
                }
            },
            include: [
                {
                    model: OrderStatus,
                    attributes: ["name"],
                }
            ],
            limit: 10
        });

        const orderListByUserIdDTO = orderListByUserId.map((order) => {
            return {
                id: order.id,
                statusId: order.statusId,
                orderDate: order.orderDate,
                orderTotal: order.orderTotal,
                statusName: order.status.toJSON().name
            }
        })
        return orderListByUserIdDTO;
    };
};

//VariationService as a singleton
export const shopOrderService = new ShopOrderService();