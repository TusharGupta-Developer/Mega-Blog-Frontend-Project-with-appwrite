import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

export class Service {
    client = new Client();
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
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug, // Generate a unique ID
                 // those slug value will be passed it will become documents ID
                { //  information u wana stored
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
        //On success, it returns an "object({})" containing the newly created document's metadata and data.
    }
    

    //Update a document by its unique ID. Using the patch method you can pass only specific fields that will get updated.
    async updatePost(slug, { title, content, featuredImage, status }) { // 1st parameter is slug because slug will be document ID . 
        // And we does not take userID in 2nd parameter object because we only give edit optipon only to user ? 

        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,

                { title, content, featuredImage, status } // Correct usage
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
        // this function will return the updated document if the update is successful.
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

    async getPost(slug) {
        console.log("Getting post with slug:", slug); // Debugging log
        try {
            if (!slug) {
                throw new Error("Slug is undefined or empty");
            }
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug // Ensure this is a valid document ID
            );
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
        // If the file upload is successful, the method returns object of metadata about the uploaded file such as its ID, URL, and other attributes. IF not return false.
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

    getFilePreview(fileID) { //The getFilePreview(fileID) function is used to generate and return a (preview URL/like thumbmail) of a file stored in Appwrite's storage system. It is typically used to display images or other file types (like PDFs) in a smaller, preview format without retrieving the full file.
        return this.storage.getFilePreview(
            conf.appwriteBucketID,
            fileID
        )
    }


}


const service = new Service()
export default service
