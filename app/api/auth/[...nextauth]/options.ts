import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        console.log("Profile GitHub: ", profile);

        let userRole = "GitHub User";
        if (profile?.email === "jake@claritycoders.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      profile(profile) {
        console.log("Profile Google: ", profile);

        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-password",
        },
      },

      async authorize(credentials) {
        try {
          const response = await fetch(
            "https://akil-backend.onrender.com/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Login failed");
          }

          const data = await response.json();

          if (data.success && data.data) {
            const user = {
              id: data.data.id,
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken,
              name: data.data.name,
              email: data.data.email,
              profilePicUrl: data.data.profilePicUrl,
              role: data.data.role,
              profileComplete: data.data.profileComplete,
              profileStatus: data.data.profileStatus,
            };

            console.log("Authorized user:", user);
            return user;
          } else {
            throw new Error("User data not found");
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) session.user.role = token.role;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
