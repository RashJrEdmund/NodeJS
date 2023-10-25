import express, { Request, Response } from "express";
import { template_data } from "../../defaults";

import multer from "multer";
import custom_logger from "../../services/extra/custom_logger";
import path from "path";
import fs from "fs";

const uploads_dir = path.join(__dirname, "../../../public/uploads");
const file_db_dir = path.join(__dirname, "../../../public/fs_db");

const storage = multer.diskStorage({
    destination: (req, file, cb) => { // see tutorial https://www.youtube.com/watch?v=wIOpe8S2Mk8
        cb(null, uploads_dir);
    },
    filename: (req, file, cb) => {
        const assignedName = req.body.name || "";
        cb(null, `${assignedName}-${Date.now() + path.extname(file.originalname)}`); // cb is a calbackfunction, that takes, error, and filename.(name to give the file)
    }
});

const uploads = multer({ storage });

const router = express.Router();

router.post("/", uploads.single("image_file"), async (req: Request, res: Response) => { // "image_file" in .single("") is the field name.
    try {
        const { file, files, body } = req;

        const filename = file?.filename as string; // use this an the fs.write file to save an array.

        const file_path = path.join(uploads_dir, filename as string);

        fs.readFile(file_db_dir + "/fs_db.txt", "utf8", (err, file_content) => {
            if (err) return console.error("an error occured", err);

            const data = JSON.parse(file_content);
            custom_logger("fs_db data", data);

            const new_data = [...data, filename];

            fs.writeFile(file_db_dir + "/fs_db.txt", JSON.stringify(new_data), (error) => {
                if (error) return console.error("an error occured", error);
            })
        });

        custom_logger("files", { file, filename, ...body });

        // const image = await new Promise((resolve, reject) => {
        //     fs.readFile(file_path, (err, data) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(Buffer.from(data).toString("base64url"));
        //         }
        //     });
        // });

        // return res.status(200).json({ image });

        res.status(200).sendFile(file_path, (err) => {
            if (err) custom_logger("ERROR IN SENDFILE CALLBACK", { message: "AN ERROR OCCURED", err });
        });
    } catch (error) {
        custom_logger("ERROR", error);
        res.json({ message: "AN ERROR OCCURED" });
    }
});

export default router;
