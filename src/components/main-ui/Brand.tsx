import Image from "next/image";

const Brand = ({ ...props }) => (
  <Image src="/logos/logo.svg" alt='Float UI logo' {...props} priority />
);
export default Brand;
