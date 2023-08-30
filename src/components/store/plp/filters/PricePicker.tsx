import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function PricePicker(props: { filters: any, setFilters: any }) {

  const { filters, setFilters } = props;
  const refFrom = useRef<HTMLInputElement>(null);
  const refTo = useRef<HTMLInputElement>(null);

  const [priceFrom, setPriceFrom] = useState<string>(filters?.selectedPrice?.from ? filters?.selectedPrice?.from : '');
  const [priceTo, setPriceTo] = useState<string>(filters?.selectedPrice?.to ? filters?.selectedPrice?.to : '');
  const debouncedPriceFrom = useDebounce(priceFrom, 1000);
  const debouncedPriceTo = useDebounce(priceTo, 1000);

  const handleChangeFrom = (e: any) => {
    setPriceFrom(e.target.value);
  };

  const handleChangeTo = (e: any) => {
    setPriceTo(e.target.value);
  };

  useEffect(() => {
    setFilters({
      ...filters,
      selectedPrice:
        { from: debouncedPriceFrom, to: debouncedPriceTo, }
    })
  }, [debouncedPriceFrom, debouncedPriceTo, filters, setFilters])

  useEffect(() => {
    if (refFrom.current != null) {
      refFrom.current.value = filters.selectedPrice.from.toString();
    }
    if (refTo.current != null) {
      refTo.current.value = filters.selectedPrice.to.toString();
    }
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
              setPriceFrom('');
              setPriceTo('');
              if (refFrom.current != null) {
                refFrom.current.value = '';
              }
              if (refTo.current != null) {
                refTo.current.value = '';
              }
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
                ref={refFrom}
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
                ref={refTo}
              />
            </label>
          </div>
        </div>
      </div>
    </details>
  )
}