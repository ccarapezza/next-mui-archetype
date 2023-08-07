import { Sequelize } from "sequelize-typescript";
import config from "./config/config-docker-db.json";
import {
  Account,
  Session,
  User,
  VerificationToken,
  Post,
  Role,
  Subscriber,
  EmailTemplate,
  ProductCategory,
  Product,
  ProductItem,
  Variation,
  VariationOption
} from "@/db/models";
import SequelizeAdapter from "../auth/adapters/SequelizeAdapter";
import { Dialect } from "sequelize";

const env = process.env.NODE_ENV || 'development';
const sequelizeInstace = new Sequelize(
    config[env].database,
    config[env].username, 
    config[env].password!,
    {
        host: config[env].host,
        port: Number(config[env].port),
        dialect: config[env].dialect as Dialect,
        dialectOptions: {
            decimalNumbers: true
        },
    }
);

sequelizeInstace.addModels([
  User,
  Account,
  Session,
  VerificationToken,
  Post,
  Role,
  Subscriber,
  EmailTemplate,
  ProductCategory,
  Product,
  ProductItem,
  Variation,
  VariationOption
]);

const adapter = SequelizeAdapter(sequelizeInstace!, {
  synchronize: false,
  models: {
    User: sequelizeInstace.define("user", User.getAttributes<User>()),
    Account: sequelizeInstace.define("account", Account.getAttributes<Account>()),
    Session: sequelizeInstace.define("session", Session.getAttributes<Session>()),
    VerificationToken: sequelizeInstace.define("verification_token", VerificationToken.getAttributes<VerificationToken>()),
  },
});

export {
  User,
  Account,
  Session,
  VerificationToken,
  Post,
  Role,
  Subscriber,
  EmailTemplate,
  ProductCategory,
  Product,
  ProductItem,
  Variation,
  VariationOption
}

export { sequelizeInstace, adapter }