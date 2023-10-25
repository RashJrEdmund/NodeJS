// NOTE! +=> removing this content without cleaning them from the following files will break your code.
const MY_GITHUB_URL = process.env.MY_GITHUB_URL;

const MY_TWITTER_URL = process.env.MY_TWITTER_URL;

type NAV = { name: string, path: string };

type TEMPLATE_DATA = {
    view: string,
    path: string,
    page_data: {},
    nav_content: NAV[]
}

const nav_content: NAV[] = [ // data used for rendering the navbar
    {
        name: "Home",
        path: "/",
    },
    {
        name: "File Upload",
        path: "/fileupload"
    },
    {
        name: "Error page",
        path: "/error",
    }
];

const render_defaults = {
    MY_GITHUB_URL,
    MY_TWITTER_URL,
    title: "My Node Template",
};

export const template_data: TEMPLATE_DATA[] = [ // data used for rendering the navbar
        {
            view: "landing",
            path: "/",
            page_data: {
                ...render_defaults
            },
            nav_content,
        },
        {
            view: "fileupload",
            path: "/fileupload",
            page_data: {
                ...render_defaults,
                title: "FIle upload",
            },
            nav_content,
        },
        {
            view: "error",
            path: "/error",
            page_data: {
                ...render_defaults,
                header: "ERROR",
                status: "400",
                message: "AN ERROR OCCURED"
            },
            nav_content,
        }
    ];
