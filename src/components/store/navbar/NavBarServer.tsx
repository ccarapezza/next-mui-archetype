import Navbar from "./Navbar";
import { productCategoryService } from "@/services/ProductCategoryService";

const fetchCategoryData = async () => {
  return productCategoryService.searchCategoryTree(null);
};

export default async function NavBarServer() {
  const categoryTree = await fetchCategoryData();

  return (
    <Navbar categoryTree={categoryTree} />
  )
}