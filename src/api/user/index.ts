import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { CaptchaResult, LoginData, LoginResult, UserInfo } from './types'

/**
 * 登录API
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
    return request({
        url: '/admin/core/auth/login',
        method: 'post',
        params: data,
    });
}

/**
 * 获取验证码
 */
export function getCaptchaApi(): AxiosPromise<CaptchaResult> {
    return request({
      url: 'admin/core/auth/captcha',
      method: 'get'
    });
}

/**
 * 注销API
 */
export function logoutApi() {
    return request({
      url: 'admin/core/auth/logout',
      method: 'delete'
    });
}

/**
 * 获取用户信息
 */
export function getUserInfo(): AxiosPromise<UserInfo> {
    return request({
        url: 'admin/core/auth/info',
        method: 'get',
    })
}