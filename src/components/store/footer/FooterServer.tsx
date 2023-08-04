import Footer from "./Footer";


const fetchCategoryData = async () => {
  const res = await fetch(`http://localhost:3000/api/store/category/list/`, {
    cache: 'no-store',
  });
  return res.json();
};

export default async function () {

  const categoryTree = await fetchCategoryData();

  return (
    <Footer categoryTree={categoryTree} />
  )
}