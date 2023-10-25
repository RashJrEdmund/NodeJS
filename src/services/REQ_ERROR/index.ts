import type { REQ_ERROS_INTFC } from "./REQ_ERROS_INTFC";

export type INDENTIFIER = "USER" // TODO +=> add other idetifiers if you create new schemas

export type _options = {
    _strict: boolean,
}

export type STR_FNC = () => string;

export default class REQ_NOT_FOUND_ERROS implements REQ_ERROS_INTFC {
    identifier

    constructor(_identifier: INDENTIFIER) {
        this.identifier = _identifier
    }

    static NOT_ALLOWED = () => "NOT_ALLOWED";

    static INCORRECT_EMAIL_OR_PASSWORD = () => "INCORRECT_EMAIL_OR_PASSWORD";

    static MISSING_TOKEN = () => "MISSING_TOKEN";

    static BEAER_NOT_FOUND = () => "BEAER_NOT_FOUND";

    MISSING_DETAILS = () => {
        return `MISSING_${this.identifier}_DETAILS`;
    }

    NONE_FOUND = () => {
        return `NO_${this.identifier}S_FOUND`;
    }

    UNRECOGNIZED_ENTITY = () => {
        return `UNRECOGNIZED_ENTITY`;
    }

    NOT_FOUND = (options = { _strict: false }) => {
        return `${options?._strict ? "" : this.identifier + "_"}NOT_FOUND`;
    }

    NOT_ALLOWED = () => {
        return `NOT_ALLOWED`;
    }

    AN_ERROR_OCCURED = () => {
        return `AN_ERROR_OCCURED`;
    }

    URECOGNISED_STRING_FOR_OBJECT_ID = () => {
        return `URECOGNISED_STRING_FOR_OBJECT_ID`;
    }

    UNRECOGNIZED_FIELD = (field: string) => {
        return `UNRECOGNIZED_FIELD: ${field}`;
    }

    FETCH_URL_NOT_SPECIFIED = () => {
        return `FETCH_URL_NOT_SPECIFIED`;
    }
}
