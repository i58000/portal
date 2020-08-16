import axios from "axios";
import Account from "@/models/Account";
import $store from "@/store";

export const register = async (
    username: string,
    password: string,
    confirm: string,
    email: string
) => {
    const resp = await axios.post("/api/v1/account/register", {
        username,
        password,
        confirm,
        email
    });
    // if (resp.data.code === 0) {
    const { nickname, id } = resp.data;
    $store.account = { username, nickname, id } as Account;
    // }
    return resp.data;
};

export const login = async (username: string, password: string) => {
    const resp = await axios.post("/api/v1/account/login", {
        username,
        password
    });
    // if (resp.data.code === 0) {
    const { nickname, id } = resp.data;
    $store.account = { username, nickname, id } as Account;
    // }
    return resp.data;
};

export const logout = async () => {
    const resp = await axios.post("/api/v1/account/logout");
    $store.account = null;
    return resp.data;
};

export const check = async () => {
    const resp = await axios.post("/api/v1/account/check");
    const { nickname, username, id } = resp.data;
    if (username) {
        $store.account = { username, nickname, id } as Account;
    }
    return resp.data;
    // $store.account = {
    //   username: "adddddd",
    //   nickname: "Adddddddd",
    //   id: 111
    // } as Account;
};

export const queryAccount = async ({ keyword, pager }: any) => {
    console.log("api query account", keyword, pager);
    const resp = await axios.get("/api/v1/account", {
        params: {
            keyword,
            pager
        }
    });
    return resp.data.accounts
};
