import { config } from "dotenv";

config(); // TODO +=> configuring .env to read hear. don't forget to update this path in the build

const MONGO_CONNECT_URL = process.env.MONGO_CONNECT_URL;

const PORT = process.env.PORT || 8000;

// TODO +=> use the bellow if you plan on validating with bcrypt and jwt
// TODO +=> navigate to src/services/validation/index.ts to see the validation process

// const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

// const SALT_ROUNDS = process.env.SALT_ROUNDS;

// const TOKEN_EXPIRERY_TIME = process.env.TOKEN_EXPIRERY_TIME;

export {
    MONGO_CONNECT_URL,
    PORT,
    // JWT_PRIVATE_KEY,
    // SALT_ROUNDS,
    // TOKEN_EXPIRERY_TIME
};
