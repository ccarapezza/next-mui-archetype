
export default function MyOrders () {

    const tableItems = [
        {
            name: "00004452346788",
            date: "Oct 9, 2023",
            status: "Activa",
            price: "$35.000",
            plan: "Monthly subscription"
        },
        {
            name: "00004452346788",
            date: "Oct 12, 2023",
            status: "Activa",
            price: "$12.000",
            plan: "Monthly subscription"
        },
        {
            name: "00004452346788",
            date: "Oct 22, 2023",
            status: "Finalizada",
            price: "$20.000",
            plan: "Annually subscription"
        },
        {
            name: "00004452346788",
            date: "Oct 22, 2023",
            status: "Cancelada",
            price: "$20.000",
            plan: "Annually subscription"
        },
        {
            name: "00004452346788",
            date: "Jan 5, 2023",
            status: "Activa",
            price: "$5.000",
            plan: "Monthly subscription"
        },
        {
            name: "00004452346788",
            date: "Jan 6, 2023",
            status: "Activa",
            price: "$9.000",
            plan: "Annually subscription"
        },
    ]


    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div>
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Tus pedidos:
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Ante cualquier consulta con tus pedidos no dudes en contactarnos a info@info.com
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
                            tableItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.date}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-2 rounded-full font-semibold text-xs ${item.status == "Activa" ? "text-green-600 bg-green-50" : item.status == "Cancelada" ? "text-red-600 bg-red-50": "text-blue-600 bg-blue-50"}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.price}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}