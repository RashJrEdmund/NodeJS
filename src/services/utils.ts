import { ObjectId } from "mongodb";
import REQ_NOT_FOUND_ERROS from "./REQ_ERROR";

type STRINGIFY = (obj: any, options?: {
    _spacing?: number,
    status?: number,
    message?: string,
}
) => string;

export const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"
}

export const stringifyData: STRINGIFY = (obj: any, options = { _spacing: 4, status: 200 }) => {
    return JSON.stringify(obj, null, options._spacing);
}

export const createObjectId = (_id?: string) => {
    try {
        if (!_id) return new ObjectId(); // for creating commpletely new ObjectIds// only for users and not urls

        return new ObjectId(_id); // this is a mongodb thing, generates a unique id base on the environment and is only for server side processes
    } catch (err) {
        throw new Error(JSON.stringify({
            message: new REQ_NOT_FOUND_ERROS("USER").URECOGNISED_STRING_FOR_OBJECT_ID(),
        }));
    }
}
