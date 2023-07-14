import { Sequelize } from "sequelize-typescript";
import config from "./config/config.json";
import { Account, Session, User, VerificationToken, Post, Role, Subscriber, EmailTemplate } from "@/db/models";
import SequelizeAdapter from "../auth/adapters/SequelizeAdapter";

const env = process.env.NODE_ENV || 'development';
const sequelizeInstace = new Sequelize(config[env].database, config[env].username, config[env].password!, {dialect: "mysql"});

sequelizeInstace.addModels([
  User,
  Account,
  Session,
  VerificationToken,
  Post,
  Role,
  Subscriber,
  EmailTemplate
]);

const adapter = SequelizeAdapter(sequelizeInstace!, {
  synchronize: false,
  models: {
    User: sequelizeInstace.define("users", User.getAttributes<User>()),
    Account: sequelizeInstace.define("accounts", Account.getAttributes<Account>()),
    Session: sequelizeInstace.define("sessions", Session.getAttributes<Session>()),
    VerificationToken: sequelizeInstace.define("verification_tokens", VerificationToken.getAttributes<VerificationToken>()),
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
  EmailTemplate
}

export { sequelizeInstace, adapter }