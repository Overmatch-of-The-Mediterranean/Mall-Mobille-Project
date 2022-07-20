// 引入常量
import { HTTP_GET, CONTENT_TYPE_FORM_URLENCODED, CONTENT_TYPE_JSON } from './constants.js';

// 默认参数
import DEFAULTS from './defaults.js';

//工具函数
import { serialize, addURLData, serializeJSON } from './utils.js';

// Ajax类
class Ajax {
    constructor(url, options) {
        this.url = url;
        this.options = Object.assign({}, DEFAULTS, options);

        //初始化
        this.init();
    }

    //初始化
    init() {
        const xhr = new XMLHttpRequest();
        // 希望在别的方法中访问到xhr
        this.xhr = xhr;

        // 绑定响应事件处理函数
        this.bindEvents();
        xhr.open(this.options.method, this.url + this.addParam(), true);

        // 设置responseType
        this.setResponseType();

        //设置跨域是否携带cookie
        this.setCookie();

        // 设置超时时间
        this.setTimeout();

        // 发送请求
        this.sendData();
    }

    // 绑定响应事件处理函数
    bindEvents() {
        // 通过this获取xhr
        const xhr = this.xhr;
        // 获取方法
        const { success, httpCodeError, error, abort, timeout } = this.options;
        // 如果考虑兼容性，这里应当使用readystatechange事件
        xhr.addEventListener('load', () => {
            if (this.ok()) {
                success(xhr.response, xhr);
            } else {
                httpCodeError(xhr.status, xhr);
            }
        }, false);
        xhr.addEventListener('error', () => {
            error(xhr);
        }, false);
        xhr.addEventListener('abort', () => {
            abort(xhr);
        }, false);
        xhr.addEventListener('timeout', () => {
            timeout(xhr);
        }, false);
    }

    //检测响应的HTTP状态码是否正常
    ok() {
        const xhr = this.xhr;
        return (xhr.status >= 200 && xhr.status < 300) || xhr.status === 304;
    }

    // 在url上添加参数
    addParam() {
        const { params } = this.options;
        // 判断params是否为null
        if (!params) return '';
        // Ajax-2的12:40处看一下
        return addURLData(this.url, serialize(params));

    }

    // 设置responseType
    setResponseType() {
        this.xhr.responseType = this.options.responseType;
    }

    //设置跨域是否携带cookie
    setCookie() {
        if (this.options.withCredentials) {
            this.xhr.withCredentials = true;
        }
    }

    // 设置超时时间
    setTimeout() {
        const { timeoutTime } = this.options;
        if (timeoutTime > 0) {
            this.xhr.timeout = timeoutTime;
        }
    }

    //发送请求
    sendData() {
        const xhr = this.xhr;
        if (!this.isSendData()) {
            return xhr.send(null);
        }

        let resultData = null;
        const { data } = this.options;

        //发送FormData格式的数据
        if (this.isFormData()) {
            resultData = data;
        } else if (this.isFormURLEncodeData()) {
            // 发送application / x - www - form - urlencoded格式的数据

            this.setContentType(CONTENT_TYPE_FORM_URLENCODED);
            resultData = serialize(data);
        } else if (this.isJSONData()) {
            // // 发送application/json格式的数据

            this.setContentType(CONTENT_TYPE_JSON);
            resultData = serializeJSON(data);
        } else {
            // 发送其他格式的数据

            this.setContentType();
            resultData = data;
        }

        xhr.send(resultData);
    }

    //是否需要使用send发送数据
    isSendData() {
        const { data, method } = this.options;
        if (!data) return false;
        if (method.toLowerCase() === HTTP_GET.toLowerCase()) return false;
        return true;
    }

    //是否发送FormData格式的数据
    isFormData() {
        return this.options.data instanceof FormData;
    }

    //是否发送application/x-www-form-urlencoded格式的数据
    isFormURLEncodeData() {
        return this.options.contentType.toLowerCase().includes(CONTENT_TYPE_FORM_URLENCODED);
    }

    // 是否发送application/json格式的数据
    isJSONData() {
        return this.options.contentType.toLowerCase().includes(CONTENT_TYPE_JSON);
    }

    //设置ContentType
    setContentType(contentType = this.options.contentType) {
        if (!contentType) return;
        this.xhr.setRequestHeader('Content-Type', contentType)
    }

    //获取XHR对象
    getXHR() {
        return this.xhr;
    }

}
export default Ajax;