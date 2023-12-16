import PriceFormatting from '@/components/management/product/PriceFormatting';
import { ProductDto } from '@/schemas/product';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from "next/link";

export default function SearchResultsList({ searchResults, loading, openModal, setOpenModal }: { searchResults: { totalItems: number; rows: any[]; totalPages: number; currentPage: number; }, loading: boolean, openModal: boolean, setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {

    const t = useTranslations('SearchBar');
    
    const closeModal = () => {
        setOpenModal(false);
    };

    const renderLoading = () => (
        <div className='flex justify-center'>
            <p>{t('searching')}</p>
        </div>
    );

    const renderNoResults = () => (
        <div className='flex justify-center mt-2'>
            <p>{t('noresults')}</p>
        </div>
    );

    const renderProductLink = (product: ProductDto) => (
        <Link href={`/product/${product.id}`} key={product.id} className='flex py-2 gap-2' onClick={closeModal}>
            <Image
                src={product.items[0].images[0]}
                alt={product.name}
                className="w-20 rounded object-cover"
                width={400}
                height={400}
            />
            <div className='flex flex-col justify-around'>
                <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                <PriceFormatting value={product.items[0].price} className='text-primary font-bold' />
            </div>
        </Link>
    );

    return (
        <>
            {openModal && (
                <div className='absolute top-[75px] right-0 bg-white p-4 rounded-md shadow-sm shadow-tertiary border'>
                    {loading ? renderLoading() : (
                        <>
                            <div className="relative flex justify-between min-w-[220px]">
                                <h5>{t('resultsTitle')}</h5>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="w-4 h-4 my-auto text-gray-400 right-1 cursor-pointer"
                                    onClick={closeModal}
                                />
                            </div>
                            {searchResults.rows.length === 0 && !loading ? renderNoResults() : null}
                            {searchResults.rows.map((product) => renderProductLink(product))}
                        </>
                    )}
                </div>
            )}
        </>
    );
}
