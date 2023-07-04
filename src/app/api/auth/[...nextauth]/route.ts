import { authOptions } from "@/auth/authOptions";
//import { authOptionsLite } from "@/auth/authOptionsLite";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }