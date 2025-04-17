import { Clinic, UserInfo } from "@api/model/auth/Auth";
import { JWT_ACCESS_TOKEN, USER } from "./constants";
import { getObject } from "./MdLogAsyncStorage";

let cachedToken = null;
let user: UserInfo
let clinic: Clinic

const initializeToken = async () => {
    if (cachedToken === null) {
        cachedToken = await getObject(JWT_ACCESS_TOKEN);
    }
};

const getToken = async () => {
    await initializeToken()
    return cachedToken;
}

export const initializeUser = async () => {
    if (user === undefined || user === null) {
        user = await getObject(USER);
    }
};

export const getUser = async () => {
    await initializeUser()
    return user;
}

export const clear = () => {
    user = undefined;
    cachedToken = undefined;

}

