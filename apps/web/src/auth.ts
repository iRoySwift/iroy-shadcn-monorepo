import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        console.log("🚀 ~ credentials:", credentials);
        if (
          credentials?.username === "admin" &&
          credentials.password === "admin"
        ) {
          return { id: "1", name: "admin" };
        }

        return null;
      },
    }),
  ],

  // Use JWT sessions so we can store custom fields in the token
  session: { strategy: "jwt" },

  // Secret used to sign the JWTs. Set NEXTAUTH_SECRET in env.
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // Persist minimal user info into the JWT on first sign in
    async jwt({ token, user }) {
      console.log("🚀 ~ jwt token, user:", token, user);
      if (user) {
        // Only add minimal, non-sensitive fields.
        token.user = { id: (user as any).id, name: (user as any).name };
      }
      return token;
    },

    // Expose token.user on the session object returned to the client
    async session({ session, token }) {
      console.log("🚀 ~ session session, token:", session, token);
      if (token.user) {
        session.user = token.user as any;
      }
      return session;
    },
  },
};

export default auth;
