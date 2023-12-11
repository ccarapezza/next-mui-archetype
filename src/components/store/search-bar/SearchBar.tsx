import { useState } from "react";
import SearchInputForm from "./SearchInputForm";
import SearchResultsList from "./SearchResultsList";
import { ProductDto } from "@/schemas/product";


export default function SearchBar() {

    const [searchResults, setSearchResults] = useState<{ totalItems: number, rows: ProductDto[], totalPages: number, currentPage: number }>({ totalItems: 0, rows: [], totalPages: 0, currentPage: 0 });
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className='relative'>
            <SearchInputForm setSearchResults={setSearchResults} setLoading={setLoading} setOpenModal={setOpenModal} />
            <SearchResultsList searchResults={searchResults} loading={loading} openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    );
}
