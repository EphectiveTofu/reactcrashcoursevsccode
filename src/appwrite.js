import { Client, Databases } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
    .setEndpoint('http://localhost/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client);
    

export const updateSearchCount = async ( searchTerm, movie) => {

    // console.table({DATABASE_ID, COLLECTION_ID, PROJECT_ID});
    //1.Use Appwrite SDK  to see if the search term exists in the database
    //2. If it does, increment the search count
    //3. If it does not, add the search term to the database and set the count to 1

}