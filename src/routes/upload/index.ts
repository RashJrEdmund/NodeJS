import express, { Request, Response } from "express";

import multer from "multer";
import custom_logger from "../../services/extra/custom_logger";
import path from "path";
import { deleteFile, getFileDbContent, saveNewFileNameToFSdb } from "./services";

const uploads_dir = path.join(__dirname, "../../../public/uploads");

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

router.get("/", async (_, res: Response) => { // "image_file" in .single("") is the field name.
    try {
        const arr_file_names = await getFileDbContent(); // handling the fs stuff.

        return res.status(200).json({ arr_file_names: arr_file_names.reverse() });
    } catch (error) {
        custom_logger("ERROR", error);
        res.json({ message: "AN ERROR OCCURED" });
    }
});

router.post("/", uploads.single("image_file"), async (req: Request, res: Response) => { // "image_file" in .single("") is the field name.
    try {
        const { file, body } = req;

        const filename = (file?.filename as string).replace(/[ ]/ig, "_"); // use this an the fs.write file to save an array.

        saveNewFileNameToFSdb(filename, res); // handling the fs stuff.        
    } catch (error) {
        custom_logger("ERROR", error);
        res.json({ message: "AN ERROR OCCURED" });
    }
});

router.delete("/", async (req: Request, res: Response) => { // "image_file" in .single("") is the field name.
    try {
        const { img: imgname } = req.query as { img: string };
        console.log("imgname", imgname, req.query);

        // return res.json({ arr_file_names: imgname })
        const arr_file_names = await deleteFile(imgname); // handling the fs stuff.

        if (arr_file_names) return res.status(200).json({ arr_file_names });

        return res.status(400).json({ arr_file_names });
    } catch (error) {
        custom_logger("ERROR", error, { type: "error" });
        res.json({ message: "AN ERROR OCCURED" });
    }
});

export default router;
