import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

export default function PricePicker(props: { filters: any, setFilters: any }) {

  const { filters, setFilters } = props;

  const [priceFrom, setPriceFrom] = useState<string>('');
  const [priceTo, setPriceTo] = useState<string>('');
  const debouncedPriceFrom = useDebounce(priceFrom, 1000);
  const debouncedPriceTo = useDebounce(priceTo, 1000);

  const handleChangeFrom = (e: any) => {
    setPriceFrom(e.target.value);
  };

  const handleChangeTo = (e: any) => {
    setPriceTo(e.target.value);
  };

  useEffect(() => {
    if (debouncedPriceFrom) {
      setFilters({
        ...filters,
        selectedPrice:
          { from: parseInt(debouncedPriceFrom), to: filters.selectedPrice.to, }
      })
    }
  }, [debouncedPriceFrom])

  useEffect(() => {
    if (debouncedPriceTo) {
      setFilters({
        ...filters,
        selectedPrice:
          { from: filters.selectedPrice.from, to: parseInt(debouncedPriceTo) }
      })
    }
  }, [debouncedPriceTo])

  useEffect(() => {
    const inputFrom = document.getElementById('FilterPriceFrom') as HTMLInputElement;
    const inputTo = document.getElementById('FilterPriceTo') as HTMLInputElement;
    inputFrom.value = filters.selectedPrice.from.toString();
    inputTo.value = filters.selectedPrice.to.toString();
  }, [filters.selectedPrice])


  return (
    <details
      className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
      open={true}
    >
      <summary
        className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
      >
        <span className="text-sm font-medium"> Precio </span>
        <span className="transition group-open:-rotate-180">
          <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
        </span>
      </summary>

      <div className="border-t border-gray-200 bg-white">
        <header className="flex items-center justify-between p-4">
          <span className="text-sm text-gray-700"> Seleccione el rango </span>

          <button
            type="button"
            className="text-sm text-gray-900 underline underline-offset-4"
            onClick={() => {
              setFilters({ ...filters, selectedPrice: { from: 0, to: 0 } })
              const inputFrom = document.getElementById('FilterPriceFrom') as HTMLInputElement;
              const inputTo = document.getElementById('FilterPriceTo') as HTMLInputElement;
              inputFrom.value = '';
              inputTo.value = '';
            }}
          >
            Reset
          </button>
        </header>

        <div className="border-t border-gray-200 p-4">
          <div className="flex justify-between gap-4">
            <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
              <span className="text-sm text-gray-600">$</span>

              <input
                type="number"
                id="FilterPriceFrom"
                placeholder="Desde"
                className="w-full border-b border-gray-200 focus:outline-none focus:border-tertiary"
                onChange={handleChangeFrom}
              />
            </label>

            <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
              <span className="text-sm text-gray-600">$</span>

              <input
                type="number"
                id="FilterPriceTo"
                placeholder="Hasta"
                className="w-full border-b border-gray-200 focus:outline-none focus:border-tertiary"
                onChange={handleChangeTo}
              />
            </label>
          </div>
        </div>
      </div>
    </details>
  )
}