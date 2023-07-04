import router from "@/router"
import { useUserStoreHook } from "@/store/modules/user"

import NProgress from "nprogress"
import "nprogress/nprogress.css"

// 白名单路由
const whiteList = ["/login"];

// 进度条
NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const hasToken = localStorage.getItem("accessToken");
    if (hasToken) {
        if (to.path == '/login') {
            // 如果已登录，跳转到首页
            next({path: '/'});
            NProgress.done();
        } else {
            const userStore = useUserStoreHook();
            const hasGetUserInfo = userStore.nickname
            if (hasGetUserInfo) {
                // 未匹配到任何路由，跳转404
                if (to.matched.length === 0) {
                    from.name ? next({ name: from.name }) : next("/404");
                } else {
                    next();
                }
            } else {
                try {
                    await userStore.getInfo();
                    next();
                } catch (error) {
                    // 移除 token 并跳转登录页
                    await userStore.resetToken();
                    next(`/login?redirect=${to.path}`);
                    NProgress.done();
                }
            }
        }
    } else {
        // 未登录可以访问白名单页面
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done();
})