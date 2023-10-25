import express, { Response } from "express";
import { template_data } from "../../defaults";

const router = express.Router();

template_data.forEach(({ view, path, page_data, nav_content }) => {
    router.get(path, (_, res: Response) => {
        const current_route = path; // helps to add css to identify the current_route. the variable must be name current_route. or change logic in navbar.ejs

        res.render(view, { current_route, page_data, nav_content }); // you can overide render_defaults if you intend to keep using this file
    });
});

export default router;
