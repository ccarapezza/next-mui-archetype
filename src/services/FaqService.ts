//Service object for Role Sequelize Model
import { FaqEditor } from "@/db";
import { GenericService } from "./GenericService";

//RoleService extends GenericService
export class FaqService extends GenericService<FaqEditor> {
    constructor() {
        super(FaqEditor);
    }

    getAllFaqDto = async () => {
        const listFaq = await FaqEditor.findAll({
            attributes: ['id', 'ask', 'answer'],
        });

        const listFaqDto = listFaq.map((faq) => {
            return {
                id: faq.id,
                ask: faq.ask,
                answer: faq.answer,
            }
        })

        return listFaqDto;
    }

};

//RoleService as a singleton
export const faqService = new FaqService();