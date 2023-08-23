import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import config from "./config/config.js";
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
  VariationOption,
  ShopOrder,
  OrderLine,
  OrderStatus
} from "@/db/models";
import SequelizeAdapter from "../auth/adapters/SequelizeAdapter";

const env = process.env.NODE_ENV || 'development';
const sequelizeInstace = new Sequelize(
    config[env] as SequelizeOptions
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
  VariationOption,
  ShopOrder,
  OrderLine,
  OrderStatus
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
  VariationOption,
  ShopOrder,
  OrderLine,
  OrderStatus
}

export { sequelizeInstace, adapter }