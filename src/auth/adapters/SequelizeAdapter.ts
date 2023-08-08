import type {
    Adapter,
    AdapterUser,
    AdapterAccount,
    AdapterSession,
    VerificationToken,
} from "next-auth/adapters"
import { Sequelize, Model, ModelStatic } from "sequelize"
import * as defaultModels from "@next-auth/sequelize-adapter/dist/models"
import EmailUtil from "@/utils/EmailUtil"
import bcrypt from 'bcryptjs';

export { defaultModels as models }

// @see https://sequelize.org/master/manual/typescript.html
interface AccountInstance
    extends Model<AdapterAccount, Partial<AdapterAccount>>,
    AdapterAccount { }
interface UserInstance
    extends Model<AdapterUser, Partial<AdapterUser>>,
    AdapterUser { }
interface SessionInstance
    extends Model<AdapterSession, Partial<AdapterSession>>,
    AdapterSession { }
interface VerificationTokenInstance
    extends Model<VerificationToken, Partial<VerificationToken>>,
    VerificationToken { }

interface SequelizeAdapterOptions {
    synchronize?: boolean
    models?: Partial<{
        User: ModelStatic<UserInstance>
        Account: ModelStatic<AccountInstance>
        Session: ModelStatic<SessionInstance>
        VerificationToken: ModelStatic<VerificationTokenInstance>
    }>
}

export default function SequelizeAdapter(
    client: Sequelize,
    options?: SequelizeAdapterOptions
): Adapter {
    const { models, synchronize = true } = options ?? {}
    const defaultModelOptions = { timestamps: false }
    const { User, Account, Session, VerificationToken } = {
        User:
            models?.User ??
            client.define<UserInstance>(
                "user",
                defaultModels.User,
                defaultModelOptions
            ),
        Account:
            models?.Account ??
            client.define<AccountInstance>(
                "account",
                defaultModels.Account,
                defaultModelOptions
            ),
        Session:
            models?.Session ??
            client.define<SessionInstance>(
                "session",
                defaultModels.Session,
                defaultModelOptions
            ),
        VerificationToken:
            models?.VerificationToken ??
            client.define<VerificationTokenInstance>(
                "verificationToken",
                defaultModels.VerificationToken,
                defaultModelOptions
            ),
    }
    let _synced = false
    const sync = async () => {
        if (process.env.NODE_ENV !== "production" && synchronize && !_synced) {
            const syncOptions =
                typeof synchronize === "object" ? synchronize : undefined

            await Promise.all([
                User.sync(syncOptions),
                Account.sync(syncOptions),
                Session.sync(syncOptions),
                VerificationToken.sync(syncOptions),
            ])

            _synced = true
        }
    }

    Account.belongsTo(User, { onDelete: "cascade" })
    Session.belongsTo(User, { onDelete: "cascade" })

    return {
        async createUser(user) {
            console.log('%cCreating User', 'color: green');

            console.log('%Sending welcome email...', 'color: green');
            try {
                await EmailUtil.sendEmail({
                    to: user.email,
                    from: "carapezza.christian@gmail.com",
                    subject: 'Welcome to NextAuth.js',
                    html: 'Your account has been created.',
                });
            } catch (error) {
                console.error('Error sending email:', error);
                throw error;    
            }
            console.log(`Email sended to ${user.email}`);

            await sync();

            const createdUser = await User.create(user);

            //generate token hash to verify email
            const token = bcrypt.hashSync(new Date().getTime().toString().concat(user.email), 10).replace(/[^a-zA-Z0-9]/g, '');
            const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);//1 day

            const verificationToken = await VerificationToken.create({
                identifier: user.email,
                token: token,
                expires//1 day
            });

            console.log('%Sending verification email...', 'color: green');
            try {
                await EmailUtil.sendVerificationEmail({
                    email: user.email,
                    token: verificationToken.token
                })
            } catch (error) {
                console.error('Error sending email:', error);
                throw error;
            }

            return createdUser;
        },
        async getUser(id) {
            console.log('%cGetting User', 'color: green');
            await sync()

            const userInstance = await User.findByPk(id)

            return userInstance?.get({ plain: true }) ?? null
        },
        async getUserByEmail(email) {
            console.log('%cGetting User by Email', 'color: green');
            await sync()

            const userInstance = await User.findOne({
                where: { email },
            })

            return userInstance?.get({ plain: true }) ?? null
        },
        async getUserByAccount({ provider, providerAccountId }) {
            console.log('%cGetting User by Account', 'color: green');
            await sync()

            const accountInstance = await Account.findOne({
                where: { provider, providerAccountId },
            })

            if (!accountInstance) {
                return null
            }

            const userInstance = await User.findByPk(accountInstance.userId)

            return userInstance?.get({ plain: true }) ?? null
        },
        async updateUser(user) {
            console.log('%cUpdating User', 'color: green');
            await sync()

            await User.update(user, { where: { id: user.id } })
            const userInstance = await User.findByPk(user.id)
            
            return userInstance!
        },
        async deleteUser(userId) {
            console.log('%cDeleting User', 'color: green');
            await sync()

            const userInstance = await User.findByPk(userId)

            await User.destroy({ where: { id: userId } })

            return userInstance
        },
        async linkAccount(account) {
            console.log('%cLinking Account', 'color: green');
            await sync()

            await Account.create(account)
        },
        async unlinkAccount({ provider, providerAccountId }) {
            console.log('%cUnlinking Account', 'color: green');
            await sync()

            await Account.destroy({
                where: { provider, providerAccountId },
            })
        },
        async createSession(session) {
            console.log('%cCreating Session', 'color: green');
            await sync()

            return await Session.create(session)
        },
        async getSessionAndUser(sessionToken) {
            console.log('%cGetting Session and User', 'color: green');
            await sync()

            const sessionInstance = await Session.findOne({
                where: { sessionToken },
            })

            if (!sessionInstance) {
                return null
            }

            const userInstance = await User.findByPk(sessionInstance.userId)

            if (!userInstance) {
                return null
            }

            return {
                session: sessionInstance?.get({ plain: true }),
                user: userInstance?.get({ plain: true }),
            }
        },
        async updateSession({ sessionToken, expires }) {
            console.log('%cUpdating Session', 'color: green');
            await sync()

            await Session.update(
                { expires, sessionToken },
                { where: { sessionToken } }
            )

            return await Session.findOne({ where: { sessionToken } })
        },
        async deleteSession(sessionToken) {
            console.log('%cDeleting Session', 'color: green');
            await sync()

            await Session.destroy({ where: { sessionToken } })
        },
        async createVerificationToken(token) {
            console.log('%cCreating Verification Token', 'color: green');
            await sync()

            return await VerificationToken.create(token)
        },
        async useVerificationToken({ identifier, token }) {
            console.log('%cUsing Verification Token', 'color: green');
            await sync()

            const tokenInstance = await VerificationToken.findOne({
                where: { identifier, token },
            })

            await VerificationToken.destroy({ where: { identifier } })

            return tokenInstance?.get({ plain: true }) ?? null
        },
    }
}