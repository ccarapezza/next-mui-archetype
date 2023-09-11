import FaqSite from "@/components/store/faq/FaqSite";
import { faqService } from "@/services/FaqService";

const faqList = async () => {
  return await faqService.getAllFaqDto();
};


export default async function Faq() {

  const faqListDto = await faqList();


  return (
    <FaqSite faqList={faqListDto} />
  )
}