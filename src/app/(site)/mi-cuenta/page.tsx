import MyOrders from "@/components/store/myaccount/MyOrders";
import { shopOrderService } from "@/services/ShopOrderService";

const orderList = async () => {
  return await shopOrderService.getOrderByUserId();
};

export default async function MyAccount() {

  const shopOrderDto = await orderList();

  return (
    <div className="mt-10">
      <MyOrders shopOrderDto={shopOrderDto} />
    </div>
  )
}

export const dynamic = 'force-dynamic';