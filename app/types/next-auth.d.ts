import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
      refreshToken: string;
      profilePicUrl: string;
      profileComplete: boolean;
      profileStatus: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    accessToken: string;
    refreshToken: string;
    profilePicUrl: string;
    profileComplete: boolean;
    profileStatus: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    refreshToken: string;
    profilePicUrl: string;
    profileComplete: boolean;
    profileStatus: string;
    role: string; // Add role here
  }
}
