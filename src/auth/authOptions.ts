import { NextAuthOptions }  from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { adapter } from "@/db/index"
import bcrypt from 'bcryptjs';
import { User } from "@/db";

export const authOptions: NextAuthOptions = {
  adapter,
  // https://next-auth.js.org/configuration/providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID?process.env.GOOGLE_ID:"",
      clientSecret: process.env.GOOGLE_SECRET?process.env.GOOGLE_SECRET:"",
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
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await User.findOne({
          include: ["roles"],
          where: {
            name: credentials?.username 
          }
        });

        if (user && bcrypt.compareSync(credentials?.password!, user?.password!)) {
          // Any object returned will be saved in `user` property of the JWT
          const userJson = user.toJSON();

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
          return null
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
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
      /*
      if (token && session.user) {
        session.user.role = token.role;
      }
      */
      return session;
    },



    /*session: async (session, user) => {
      session.id = user.id;
      return Promise.resolve(session);
    },*/
    async signIn({ user, account, profile, email, credentials }) {
      console.log("########-signIn", user, account, profile, email, credentials);
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect({ url, baseUrl }) {
      console.log("########-redirect", url, baseUrl);
      if(url.startsWith("/management")){
        return Promise.resolve(url);  
      }     
      return Promise.resolve(baseUrl);
    },
    /*
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("########-jwt", token, user, account, profile, isNewUser);
      return token
    },
    async session({ session, user, token}) {
      console.log("########-session", session, user, token);
      return session
    }
    */
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,

}