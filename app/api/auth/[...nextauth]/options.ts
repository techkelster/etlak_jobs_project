import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const options: NextAuthOptions = {
  providers: [
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
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        // Store all the user data in the token
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.name = user.name;
        token.email = user.email;
        token.profilePicUrl = user.profilePicUrl;
        token.role = user.role;
        token.profileComplete = user.profileComplete;
        token.profileStatus = user.profileStatus;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Pass the user data from the token to the session
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.profilePicUrl = token.profilePicUrl;
      session.user.role = token.role;
      session.user.profileComplete = token.profileComplete;
      session.user.profileStatus = token.profileStatus;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
