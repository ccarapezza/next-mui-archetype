import Image from "next/image";
import logo from "@/assets/logos/logo.svg";

const Brand = ({ ...props }) => (
  <Image src={logo} alt='Float UI logo' {...props} priority />
);
export default Brand;
