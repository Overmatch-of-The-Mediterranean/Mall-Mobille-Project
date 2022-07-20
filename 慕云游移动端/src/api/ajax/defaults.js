// 引入常量
import { HTTP_GET, CONTENT_TYPE_FORM_URLENCODED } from './constants.js';

// 默认参数
const DEFAULTS = {
    method: HTTP_GET,
    // 请求头携带数据，添加到url，变成名值对形式
    params: null,
    // params: {
    //     username: 'alex',
    //     age: 18
    // }
    // username=alex&age=18

    //请求体携带数据
    data: null,
    // data: {
    //     username: 'alex',
    //     age: 18
    // }
    // data:FormData 数据

    // 发送的方式
    contentType: CONTENT_TYPE_FORM_URLENCODED,
    responseType: 'text',
    timeoutTime: 0,
    withCredentials: false,

    // 请求成功之后处理数据
    // 方法
    success() { },
    httpCodeError() { },
    error() { },
    abort() { },
    timeout() { }
};
export default DEFAULTS;