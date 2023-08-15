//Service object for EmailTemplate Sequelize Model
import { EmailTemplate } from "@/db";
import findAllSequelizePagination from "@/db/utils/pagination";
import { Model, Op, WhereOptions } from "sequelize";
import { GenericService } from "./GenericService";

interface IEmailTemplateService extends GenericService<EmailTemplate> {
    search: (searchTerm: string | null, page: number, size: number) => Promise<any>;
}

//EmailTemplateService extends GenericService
export class EmailTemplateService extends GenericService<EmailTemplate> implements IEmailTemplateService {
    constructor() {
        super(EmailTemplate);
    }
    search = async (searchTerm: string | null, page: number = 1, size: number = 10) => {
        let where: WhereOptions | undefined = undefined;
        if (searchTerm) {
            where = {
                name: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        }
        const emailTemplates = await findAllSequelizePagination({
            model: EmailTemplate,
            page: page,
            size: size,
            attributes: ['id', 'name', 'template'],
            where
        });

        return emailTemplates;
    }
}

//EmailTemplateService as a singleton
export const emailTemplateService = new EmailTemplateService();