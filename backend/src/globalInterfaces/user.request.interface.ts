import { Request } from "express"
import { User } from "types/types";

interface RequestWithUser extends Request {
    user?: User;
}

export default RequestWithUser