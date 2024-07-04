import { StatusCodes } from "http-status-codes";

class NotFound extends Error {
    constructor(message) {
        super(message)
        this.name = "NotFound"
        this.status = StatusCodes.NOT_FOUND
    }
}

class BadRequest extends Error {
    constructor(message) {
        super(message)
        this.name = "InvaidUser"
        this.status = StatusCodes.BAD_REQUEST
    }
}

class ExistingConflict extends Error {
    constructor(message) {
        super(message)
        this.name = "ExistingConflict"
        this.status = StatusCodes.CONFLICT
    }
}

export{
    NotFound,
    BadRequest,
    ExistingConflict
}
