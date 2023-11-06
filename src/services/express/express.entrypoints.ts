import { Application } from "express";
import { fall_back, index_router, upload_router } from "../../routes";

export default async (app: Application) => {
    // application routes
    app.use('/', index_router);

    app.use("/uploads", upload_router);

    app.use("/*", fall_back);
};
