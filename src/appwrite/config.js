import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID)
        this.account = new Account(this.client)

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client)

    }

    //To Create Post(To create a document) use the createDocument method.
    async createPost({ title, slug, content, featuredImage, status, userID }) {
        try {
            await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug, // those slug value will be passed it will become documents ID
                { //  information u wana stored
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                }

            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    //Update a document by its unique ID. Using the patch method you can pass only specific fields that will get updated.
    async updatePost(slug, { title, content, featuredImage, status }) { // 1st parameter is slug because slug willl be document ID . 
        // And we does not take userID in 2nd parameter object because we only give edit optipon only to user ? 

        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,

                [title, content, featuredImage, status] // queries (optional)
            )

        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }

    }

    //Delete a document
    async deletePost(slug) {

        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true; // It's tells that post deleted successfully. And now depends on frontend(Components) how to handle this if true is came or if not.
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false; // If error will came return false.
        }

    }

    // Get a document by its unique ID(here it is slug)
    async getPost(slug) {

        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    //Get a list of all the user's documents in a given collection. You can use the query params to filter your results.
    async getPosts(queries = [Query.equal("status", "active")]) { // if status is active then it will return documents. And for key(here status) we have to make index in appwrite
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;

        }

    }

    // file upload service(Later, I have to make in differnent file)

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileID) { // In uploadfile it return fileId , and this fileID will be pass to featuredImage during creation of Post.
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketID,
                fileID
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;

        }
    }

    getFilePreview(fileID) {
        this.storage.getFilePreview(
            conf.appwriteBucketID,
            fileID
        )
    }


}


const service = new Service()
export default service
