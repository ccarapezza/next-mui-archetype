import FaqSite from "@/components/store/faq/FaqSite";
import { FaqListDto } from "@/schemas/faq";


export default async function FaqListManagment(props: { listFaq: FaqListDto[] }) {

    const { listFaq } = props;

    return (<>
        <FaqSite faqList={listFaq} />
    </>)
}