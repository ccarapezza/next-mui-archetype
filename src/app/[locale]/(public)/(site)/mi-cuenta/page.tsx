import MyOrders from "@/components/store/myaccount/MyOrders";
import { shopOrderService } from "@/services/ShopOrderService";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const orderList = async () => {
  return await shopOrderService.getOrderByUserId();
};

export default async function MyAccount() {

  const shopOrderDto = await orderList();

  return (
    <div className="mt-10">
      <MyOrders shopOrderDto={shopOrderDto} emailFrom={publicRuntimeConfig.emailFrom} />
    </div>
  )
}

export const dynamic = 'force-dynamic';