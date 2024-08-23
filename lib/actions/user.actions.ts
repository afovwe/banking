'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({email, password}: signInProps) => {
    try {
        // Mutation / Database / Make fetch
          const { account } = await createAdminClient();
          const response = await account.createEmailPasswordSession(email, password);
          return parseStringify(response);
    } catch (error) {
        console.error('Error', error)
        
    }
}

export const signUp = async (userData: SignUpParams) => {
     const { email, password, firstName, lastName } = userData;
    try {
        // Mutation / Database / Make fetch
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(newUserAccount)
    } catch (error) {
        console.error('Error', error)
        
    }
}

// ... your initilization functions
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    console.log("Session client created:", account); // Log the account object
    const user = await account.get();
    console.log("User fetched:", user); // Log the user data fetched
    return parseStringify(user);
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    return null;
  }
}
