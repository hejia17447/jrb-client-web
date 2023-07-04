import { defineStore } from "pinia";

import { loginApi, logoutApi, getUserInfo } from "@/api/user";
import { UserInfo, LoginData } from "@/api/user/types";
import { resetRouter } from "@/router";
import { store } from "@/store";

import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
    // state
    const token = useStorage("accessToken", "");
    const nickname = ref("");
    const avatar = ref("");

    function login(loginData: LoginData) {
        return new Promise<void>((resolve, reject) => {
            loginApi(loginData)
                .then((response) => {
                    const { accessToken } = response.data;
                    token.value = accessToken;
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    function getInfo() {
        return new Promise<UserInfo>((resolve, reject) => {
            getUserInfo().then(({ data }) => {
                if (!data) {
                    return reject("验证失败，请重新登录。");
                }
                nickname.value = data.nickname;
                avatar.value = data.avatar;
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            })
        })
    }

    function logout() {
        return new Promise<void>((reslove, reject) => {
            logoutApi().then(() => {
                resetRouter();
                resetToken();
                location.reload();
                reslove();
            })
            .catch((error) => {
                reject(error);
            })
        })
    }

    function resetToken() {
        token.value = "";
        nickname.value = "";
        avatar.value = "";
    }

    return {
        token,
        nickname,
        avatar,
        login,
        getInfo,
        logout,
        resetToken,
    }

});

// 非setup
export function useUserStoreHook() {
    return useUserStore(store);
}