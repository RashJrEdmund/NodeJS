import { ObjectId } from "mongoose";

// export type LINK_OBJ = {
//     _id?: ObjectId;
//     user_id: string; // null for not logged in users
//     short_link?: string;
//     original: string;
//     clicks: string | number;
//     status?: "Active" | "Inactive";
//     alias?: string;
//     createdAt?: string | number;
// };

export type USER = {
    _id?: string,
    username: string,
    email: string,
    password: string,
    createdAt?: string,
    updatedAt?: string,
}
