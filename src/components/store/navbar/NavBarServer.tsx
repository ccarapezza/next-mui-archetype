import { getProviders } from "next-auth/react";
import Navbar from "./Navbar";

const fetchCategoryData = async () => {
  const res = await fetch(`http://localhost:3000/api/store/category/list/`, {
    cache: 'no-store',
  });
  return res.json();
};

export default async function NavBarServer() {

  const providers = await getProviders();
  const categoryTree = await fetchCategoryData();

  return (
    <Navbar categoryTree={categoryTree} providers={providers!}/>
  )
}