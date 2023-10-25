import express, { Response } from "express";
import { template_data } from "../../defaults";

const router = express.Router();

router.get("/*", (_, res: Response) => { // last route to catch all routes
    const error_data = template_data.pop();

    if (!error_data) return;

    const { view, path, page_data, nav_content } = error_data;

    res.render(view,
        {
            path,
            nav_content,
            current_route: path,
            page_data: {
                ...page_data,
                header: "ERROR",
                status: 404,
                message: "PAGE NOT FOUND"
            }
        }
    );
});

export default router;
