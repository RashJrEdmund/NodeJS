// UPLOAD SERVICES
import custom_logger from "../../services/extra/custom_logger";
import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs"
import { Response } from "express";

const public_dir = path.join(__dirname, "../../../public");
const file_db_dir = path.join(public_dir, "/fs_db");
const delimeter = "\n|\n"; // for spliting and joining a images to and from an array

type G = () => Promise<string[]>;
type T = (filename: string, res: Response) => void;
type D = (filename: string) => Promise<string[] | undefined>;

export const getFileDbContent: G = async () => {
    let arr_file_names: string[] = [];

    const file_content = await fsPromises.readFile(file_db_dir + "/fs_db.txt", "utf8");

    arr_file_names = file_content ? file_content.split(delimeter) : [];

    custom_logger("fs_db arr_file_names get", { arr_file_names });

    return arr_file_names;
};

export const saveNewFileNameToFSdb: T = (filename, res) => { // this entire method could lead to a callback hell
    let arr_file_names: string[] = [];

    fs.readFile(file_db_dir + "/fs_db.txt", "utf8", (err, file_content) => {
        if (err) return console.error("an error occured", err);

        arr_file_names = file_content.split(delimeter);

        custom_logger("fs_db arr_file_names save", arr_file_names);

        if (!arr_file_names[0]) arr_file_names[0] = filename;
        else arr_file_names.push(filename); // adding the filname.

        fs.writeFile(file_db_dir + "/fs_db.txt", arr_file_names.join(delimeter), (error) => {
            if (error) return console.error("an error occured", error);
            return res.status(200).json({ arr_file_names: arr_file_names.reverse() });
        });
    });
};

export const deleteFile: D = async (filename) => {
    try {
        let arr_file_names: string[] = [];

        const response_1: string = await fsPromises.readFile(file_db_dir + "/fs_db.txt", "utf8");

        arr_file_names = response_1.split(delimeter).filter((file) => file !== filename);

        await fsPromises.writeFile(file_db_dir + "/fs_db.txt", arr_file_names.join(delimeter));

        await fsPromises.unlink(public_dir + "/uploads/" + filename);

        return arr_file_names.reverse();
    } catch (error) {
        console.error(error);
    }
}
