'use client'
import CategorySelector from './filters/CategorySelector';
import ColorPicker from './filters/ColorPicker';
import SizeSelector from './filters/SizeSelector';
import PricePicker from './filters/PricePicker';

const colors = [
  {
    color: '#000000',
    name: 'Negro',
  },
  {
    color: '#002BFF',
    name: "Azul",
  },
  {
    color: '#FF0000',
    name: "Rojo",
  },
  {
    color: '#00FF04',
    name: "Verde",
  }
]

const talles = [
  {
    talle: 'S',
  },
  {
    talle: "M",
  },
  {
    talle: "L",
  },
  {
    talle: "XL",
  }
]

export default function (props: { categoryTree: any, categoryTitle: string }) {

  const { categoryTree, categoryTitle } = props;

  return (
    <div className="space-y-2">
      <h3 className='text-lg text-tertiary-800 font-semibold pb-2 border-b border-gray-300 mb-4'>Filtros:</h3>
      <CategorySelector categoryTree={categoryTree} categoryTitle={categoryTitle} />
      <ColorPicker colors={colors} />
      <SizeSelector talles={talles} />
      <PricePicker />
    </div>
  )
}