import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { Account, Role, adapter } from "@/db/index"
import bcrypt from 'bcryptjs';
import { User, VerificationToken } from "@/db";
import EmailUtil from "@/utils/EmailUtil";
import { Op } from "sequelize";
import S3BucketUtil from "@/utils/S3BucketUtil";

const ROLE_NAME_ALLOWED_MANAGEMENT = "user";
const ROLE_NAME_ADMIN = "admin";
const ROLE_CLIENT = "client";

export const authOptions: NextAuthOptions = {
    adapter,
    // https://next-auth.js.org/configuration/providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ? process.env.GOOGLE_ID : "",
            clientSecret: process.env.GOOGLE_SECRET ? process.env.GOOGLE_SECRET : "",
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
                management: { label: "Management", type: "hidden", value: "false" }
            },
            async authorize(credentials, req) {
                console.log("Authorizing...", credentials);

                //Management login
                if (credentials?.management === "true") {

                    //is dev environment and user "admin" not exists, create it
                    if (process.env.NODE_APP_ADMIN_USER) {
                        const existingUser = await User.findOne({
                            where: {
                                name: process.env.NODE_APP_ADMIN_USER
                            }
                        });
                        if ((!existingUser) && process.env.NODE_APP_ADMIN_PASSWORD) {
                            console.log("Create admin user for dev environment");
                            const userCreated = await User.create({
                                name: process.env.NODE_APP_ADMIN_USER,
                                email: "admin@admin.com",
                                image: "",
                                emailVerified: new Date(),
                                password: bcrypt.hashSync(process.env.NODE_APP_ADMIN_PASSWORD, 10)
                            });
                            const adminRole = await Role.findOne({
                                where: {
                                    name: ROLE_NAME_ADMIN
                                }
                            });
                            if (adminRole) {
                                await userCreated.addRole(adminRole);
                            }
                            const allowedRole = await Role.findOne({
                                where: {
                                    name: ROLE_NAME_ALLOWED_MANAGEMENT
                                }
                            });
                            if (allowedRole) {
                                await userCreated.addRole(allowedRole);
                            }
                        }
                    }

                    console.log("credentials", credentials);

                    const user = (await User.findOne({
                        include: ["roles"],
                        where: {
                            name: credentials?.username
                        }
                    }))?.toJSON();

                    if (!user) {
                        return null;
                    }

                    const allowedRol = user.roles?.find((role: any) => role.name === ROLE_NAME_ALLOWED_MANAGEMENT);


                    if (!allowedRol) {
                        return null;
                    }
                    
                    if (user && bcrypt.compareSync(credentials?.password!, user?.password!)) {
                        console.log("user", user, bcrypt.compareSync(credentials?.password!, user?.password!));
                        if (user.emailVerified === null) {
                            throw new Error("EmailNotVerified");
                        }

                        if(user?.image){
                            user.image = await S3BucketUtil.getSignedUrlByKey({
                                folder: S3BucketUtil.FOLDERS.AVATARS,
                                key: user.image,
                            });
                        }

                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            emailVerified: user.emailVerified,
                            roles: user.roles?.map((role: any) => role.name)
                        };
                    } else {
                        // If you return null then an error will be displayed advising the user to check their details.
                        //return error
                        return null;
                        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                    }

                    //Client login
                } else {
                    const user = await User.findOne({
                        include: ["roles"],
                        where: {
                            name: credentials?.username
                        }
                    });

                    if (!user) {
                        return null;
                    }

                    //check if user is a client
                    const clientRol = user.roles?.find((role: any) => role.name === ROLE_CLIENT);
                    if (!clientRol) {
                        return null;
                    }

                    if (user && bcrypt.compareSync(credentials?.password!, user?.password!)) {
                        if (user.emailVerified === null) {
                            throw new Error("EmailNotVerified");
                        }
                        // Any object returned will be saved in `user` property of the JWT
                        const userJson = user.toJSON();

                        if(userJson?.image){
                            userJson.image = await S3BucketUtil.getSignedUrlByKey({
                                folder: S3BucketUtil.FOLDERS.AVATARS,
                                key: userJson.image,
                            });
                        }

                        return {
                            id: userJson.id,
                            name: userJson.name,
                            email: userJson.email,
                            image: userJson.image,
                            emailVerified: userJson.emailVerified,
                            roles: userJson.roles?.map((role: any) => role.name)
                        };
                    } else {
                        // If you return null then an error will be displayed advising the user to check their details.
                        //return error
                        return null;
                        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                    }
                }
            }
        })
    ],
    // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
    // https://next-auth.js.org/configuration/databases
    //
    // Notes:
    // * You must install an appropriate node_module for your database
    // * The Email provider requires a database (OAuth providers do not)
    // database: process.env.DATABASE_URL,

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `strategy` should be set to 'jwt' if no database is used.
        strategy: 'jwt'

        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },

    // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt

    jwt: {
        // A secret to use for key generation (you should set this explicitly)
        secret: process.env.NEXTAUTH_SECRET,
        // Set to true to use encryption (default: false)
        // encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        /*
        encode: async ({ secret, token, maxAge }) => {
          return jwt.sign(token!, secret)
        },
        /*
        decode: async ({ secret, token }) => {
          return jwt.verify(token!, secret) as JWT
        },
        */
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        signIn: '/auth/signin',  // Displays signin buttons
        error: '/error', // Error code passed in query string as ?error=
        // signOut: '/auth/signout', // Displays form with sign out button
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        async jwt({ token, user }) {
            /* Step 1: update the token based on the user object */
            if (user) {
                token.roles = (user as any)?.roles;
            }
            return token;
        },
        session({ session, token }) {
            /* Step 2: update the session.user based on the token object */
            if (token && session.user) {
                session.user.roles = token.roles;
            }
            return session;
        },
        async signIn({ user, account, profile, email, credentials }) {
            const userInstance = user as User;

            //check if a user try to login with google account and user not exists
            if (account?.provider === "google" && userInstance.createdAt === undefined) {
                const existingUser = await User.findOne({
                    where: {
                        [Op.or]: [
                            { email: user.email! },
                            { name: user.name }
                        ]
                    }
                });
                if (existingUser) {
                    //if user exists, create a new account for this provider
                    console.log("existingUser", existingUser);
                    if (existingUser.password) {
                        await Account.create({
                            ...account,
                            userId: existingUser.id
                        });
                        return true;
                    }
                    throw new Error("UsernameAlreadyExists");
                }
                const userCreated = await User.create({
                    name: profile?.name!,
                    email: profile?.email!,
                    image: profile?.image!,
                });
                await Account.create({
                    ...account,
                    userId: userCreated.id
                });
                //generate token hash to verify email
                const token = bcrypt.hashSync(new Date().getTime().toString().concat(profile?.email!), 10).replace(/[^a-zA-Z0-9]/g, '');
                const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);//1 day

                const verificationToken = await VerificationToken.create({
                    identifier: profile?.email,
                    token: token,
                    expires//1 day
                });

                console.log('%Sending verification email...', 'color: green');
                try {
                    await EmailUtil.sendVerificationEmail({
                        email: profile?.email!,
                        token: verificationToken.token
                    })
                } catch (error) {
                    console.error('Error sending email:', error);
                    throw error;
                }

                return "/verify-email?verification-sended=true";
            }

            if (userInstance.emailVerified === null) {
                throw new Error("EmailNotVerified");
            }

            return true;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/management")) {
                return Promise.resolve(url);
            }
            return Promise.resolve(baseUrl);
        },
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: false,

}