import { ProductDto } from "@/schemas/product";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from "@uidotdev/usehooks";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const searchApiProducts = async (q: string, page: number = 1, size: number = 4) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/store/product/product-search?q=${q}&page=${page}&size=${size}`);
    return res.json();
};

export default function SearchInputForm({ setSearchResults, setLoading, setOpenModal }: { setSearchResults: React.Dispatch<React.SetStateAction<{ totalItems: number; rows: ProductDto[]; totalPages: number; currentPage: number; }>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {

    const t = useTranslations('SearchBar');
    
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isSearchCleared, setIsSearchCleared] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const searchProducts = async (query: string) => {
        setLoading(true);
        setOpenModal(true);
        setSearchResults(await searchApiProducts(query));
        setLoading(false);
        setIsSearchCleared(true);
    }

    const clearSearchResults = () => {
        setSearchResults({ totalItems: 0, rows: [], totalPages: 0, currentPage: 0 });
        setSearchTerm("");
        setIsSearchCleared(false);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setIsSearchCleared(true);
        setOpenModal(true)
    };

    const handleInputFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 3) {
            setOpenModal(true)
        }
    };

    const handleClearSearch = () => {
        setOpenModal(false);
        clearSearchResults();
        setIsSearchCleared(false);
    }

    useEffect(() => {
        if (debouncedSearchTerm && debouncedSearchTerm.length > 3) {
            searchProducts(debouncedSearchTerm)
        } else {
            setOpenModal(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm]);


    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="max-w-md mx-auto">
            <div className="relative">
                <FontAwesomeIcon icon={faSearch} className='absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-400 left-3' />
                <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    className="w-full py-3 pl-12 pr-4 text-gray-500 border-b outline-none focus:bg-white focus:border-indigo-600 mb-4 md:mb-0"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleInputFocus}
                />
                {isSearchCleared && (
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-400 right-3 cursor-pointer"
                        onClick={handleClearSearch}
                    />
                )}
            </div>
        </form>
    )
}