import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import EntryPoints from "./express.entrypoints";
import path from "path";

export default async (app: Application) => {
    // mainly for middle wares
    const cors_options: CorsOptions = {
        origin: "*",
    }

    const public_root = path.join(__dirname + "/../../../public");

    const views_root = path.join(__dirname + "/../../views");

    app.use(cors(cors_options));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); // so for it handle form data. extended: true for it to be able to handle nested dat comming from the url;
    app.set("views", views_root); // says we'll be using views and views are in the views directory
    app.set("view engine", "ejs") // sets templating engine to ejs

    app.use(express.static(public_root)); // to handle any static files that will be serve and we don't want an extra route for them. like say images, stylesheets.

    // for setting up application routes
    EntryPoints(app);
};
