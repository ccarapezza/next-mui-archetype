'use client'

import PriceFormatting from "@/components/management/product/PriceFormatting";
import getConfig from 'next/config';

export default function MyOrders(porps: { shopOrderDto: any, emailFrom: string }) {
    const { shopOrderDto, emailFrom } = porps;

    function formatDate(dateIso: string) {
        let newDate = new Date(dateIso);
        let day = newDate.getUTCDate();
        let month = newDate.getUTCMonth() + 1;
        let year = newDate.getUTCFullYear();
        let formattedDate = day + '/' + month + '/' + year;

        return formattedDate;
    }

    function getColorForStatus(statusId: number) {
        switch (statusId) {
            case 1:
            case 2:
                return "text-yellow-600 bg-yellow-50";
            case 3:
            case 5:
            case 6:
                return "text-green-600 bg-green-50";
            case 8:
            case 4:
                return "text-red-600 bg-red-50";
            default:
                return "text-blue-600 bg-blue-50";
        }
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            {
                shopOrderDto.length > 0
                    ?
                    <>
                        <div className="items-start justify-between md:flex">
                            <div>
                                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                                    Tus pedidos:
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Ante cualquier consulta con tus pedidos no dudes en contactarnos a {emailFrom}
                                </p>
                            </div>
                        </div>
                        <div className="mt-12 relative h-max overflow-auto">
                            <table className="w-full table-auto text-sm text-left">
                                <thead className="text-gray-600 font-medium border-b">
                                    <tr>
                                        <th className="py-3 pr-6">Número de pedido</th>
                                        <th className="py-3 pr-6">Fecha</th>
                                        <th className="py-3 pr-6">Estado</th>
                                        <th className="py-3 pr-6">Precio</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 divide-y">
                                    {
                                        shopOrderDto.map((item: any, idx: number) => (
                                            <tr key={idx}>
                                                <td className="pr-6 py-4 whitespace-nowrap">{item.id}</td>
                                                <td className="pr-6 py-4 whitespace-nowrap">{formatDate(item.orderDate)}</td>
                                                <td className="pr-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-2 rounded-full font-semibold text-xs ${getColorForStatus(item.statusId)}`}>
                                                        {item.statusName}
                                                    </span>
                                                </td>
                                                <td className="pr-6 py-4 whitespace-nowrap"><PriceFormatting value={item.orderTotal} /></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                    :
                    <p className="text-center text-gray-500 pt-20">No tienes órdenes.</p>
            }

        </div>
    )
}