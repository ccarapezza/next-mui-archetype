import { faqService } from "@/services/FaqService";
import FaqMain from '@/components/management/content-manager/faq/FaqMain';

const fetchFaqData = async () => {
  return await faqService.getAllFaqDto();
};

export default async function FaqManagment() {

  const faqListDto = await fetchFaqData();

  return (<>
    <FaqMain faqListDto={faqListDto} />
  </>)
}

export const dynamic = 'force-dynamic';