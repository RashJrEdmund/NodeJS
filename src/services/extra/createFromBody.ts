import REQ_NOT_FOUND_ERROS from "../REQ_ERROR";
import { USER } from "../types";

type CREATE_FROM_BODY = (body: any, options: {
    _type: "USER", // add more types that you'll create the validations for e.g "URL" | "VISITOR",
    _strict?: boolean, // strict mode is recomended for when creating. and not editting
}) =>
    {
        status: number,
        new_user?: USER | null,
        // add more visitor objects to be returned and write their validations
    }

const createFromBody: CREATE_FROM_BODY = (body, options) => {
    if (options._type === "USER") {
        const ERR_MESSAGE = new REQ_NOT_FOUND_ERROS("USER");

        if (options._strict) { // strict mode is good for creation
            if (!(body.username && body.email && body.password)) return {
                status: 404,
                new_user: null
            };

            const new_user: USER = {
                username: body.username,
                email: body.email,
                password: body.password,
                createdAt: body?.createdAt ?? new Date().toDateString(),
            }

            return { status: 200, new_user };
        }

        type key_type = string[] // using (keyof USER)[] breaks ts compiler. it's not s'possed to be so. 

        const accepted_user_keys: key_type = ["_id", "username", "email", "createdAt", "updatedAt", "password"]; // TODO +=> add the neccessary keys for creating a user

        let new_user: any = {};

        for (const key in body) {
            if (accepted_user_keys.includes(key)) new_user = { ...new_user, [key]: body[key] };
            else throw new Error(JSON.stringify({
                message: ERR_MESSAGE.UNRECOGNIZED_FIELD(key),
            }));
        }

        return { status: 200, new_user };
    }

    return {
        status: 404,
        new_user: null
    };
}

export default createFromBody;
