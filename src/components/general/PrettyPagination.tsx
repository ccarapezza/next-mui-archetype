import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react"

export default function PrettyPagination({ totalPages, currentPage, totalItems }: { totalPages: number, currentPage: number, totalItems: number }) {

    console.log(totalPages, currentPage);
    let pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);

    const [pages, setPages] = useState(pagesArray)
    const [currentPageState, setCurrentPageSatate] = useState(currentPage)

    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        const queryParams = new URLSearchParams();

        queryParams.set('page', currentPageState.toString());
        router.push(`${pathname}?${queryParams.toString()}`);
    }, [currentPageState, pages, totalPages])

    return (
        <>
            {
                totalItems > 0 ?
                    <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
                        <div className="hidden items-center justify-between sm:flex" aria-label="Pagination">
                            <button className="hover:text-blue-950 flex items-center gap-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-600"
                                onClick={() => {
                                    setCurrentPageSatate(currentPageState - 1);
                                    if (currentPageState < 1) {
                                        setPages(pagesArray.map((item) => item - 1))
                                    }
                                }}
                                disabled={currentPageState == 1}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                                Previous
                            </button>
                            <ul className="flex items-center gap-1">
                                {
                                    pages.map((item, idx) => (
                                        <li key={item} className="text-sm">
                                            {
                                                <button aria-current={currentPageState == item ? "page" : false} className={`px-3 py-2 rounded-lg duration-150 hover:text-blue-950 hover:text-blue-950 ${currentPageState == item ? "bg-blue-100 text-blue-950 font-medium" : ""}`}
                                                    onClick={() => setCurrentPageSatate(item)}
                                                >
                                                    {item}
                                                </button>
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                            <button className="hover:text-blue-950 flex items-center gap-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-600"
                                onClick={() => {
                                    setCurrentPageSatate(currentPageState + 1);
                                    if (currentPageState > totalPages) {
                                        setPages(pagesArray.map((item) => item + 1))
                                    }
                                }}
                                disabled={currentPageState == totalPages}
                            >
                                Next
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    </div>
                    :
                    <></>
            }
        </>

    )
}