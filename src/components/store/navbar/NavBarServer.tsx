import Navbar from "./Navbar";
import { ProductCategoryService } from "@/services/ProductCategoryService";

const fetchCategoryData = async () => {
  return ProductCategoryService.searchCategoryTree(null);
};

export default async function NavBarServer() {
  const categoryTree = await fetchCategoryData();

  return (
    <Navbar categoryTree={categoryTree} />
  )
}