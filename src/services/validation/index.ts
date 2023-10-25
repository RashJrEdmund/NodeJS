// TODO +=> uncomment this if you have bcrypt and jwt installed and you want to use the validation methods
// also, the constanst should be uncommented to be properly imported from src/services/constants.ts file

// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken";

// import { JWT_PRIVATE_KEY, SALT_ROUNDS, TOKEN_EXPIRERY_TIME } from "../constants";
// import type { WithId } from "mongodb";

// export class BCRYPT {
//     static hash = async (password: string) => {
//         return bcrypt.hash(password, SALT_ROUNDS);
//     }

//     static compare = async (_plain_password: string, prev_hash: string) => {
//         return bcrypt.compare(_plain_password, prev_hash);
//     }
// }

// export class TOKEN_SERVICE {
//     static sign = (_user: WithId<Document>) => {
//         return jwt.sign(
//             { ..._user, bearer_id: _user._id },
//             JWT_PRIVATE_KEY,
//             { expiresIn: TOKEN_EXPIRERY_TIME }
//         );
//     }

//     static verify = (token: string) => {
//         return jwt.verify(token, JWT_PRIVATE_KEY);
//     }
// }
