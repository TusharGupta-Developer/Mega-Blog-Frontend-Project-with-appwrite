import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {

    client = new Client(); //Only maked  client = new Client(); not .setEndpoint(conf.appwriteURL .setProject(conf.appwriteProjectID) with it beacuse we want that it new client only maked when object is made . It useful for optimization of code.

    account; // account variable: only here we only maked account variable not account because we want that account should only maked when we maked object of the class. Therefore, we gonna maked in constructor.

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID)
        this.account = new Account(this.client)
    }

    // For creating new user account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) { // if userAccount is exist

                //call another method
                // if user's account is created then call login
                return this.login({ email, password })

            } else {
                return userAccount;
            }

        } catch (error) {
            throw error
        }
    }
    //After you've created your account, users can be logged in using the Create Email Session method.
    async login({ email, password }) {
        try {
            const userLogin = await this.account.createEmailPasswordSession(email, password)
            return userLogin
        } catch (error) {
            throw error
        }
    }


    // Get the currently logged in user. From appwrite's account section's get account
    // It wil be checked user is loged or not 
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);

        }
        // if account not able to reach out service then catch wil  get error but what if not get account itself for that we use return null
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions()//Delete all sessions from the user account and remove any sessions cookies from the end client
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);

        }
    }
}

const authService = new AuthService();

export default authService;