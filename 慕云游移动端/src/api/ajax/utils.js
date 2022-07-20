// 工具函数
const serialize = param => {
    const result = [];
    // 先转换成数组，再用join()方法将数组转换成字符串
    for (const [key, value] of Object.entries(param)) {
        result.push(`${encodeURIComponent(key)}=${decodeURIComponent(value)}`);

    }
    // ['username=alex','age=18']
    return result.join('&');
};

// 数据序列化成JSON格式的字符串
const serializeJSON = param => {
    return JSON.stringify(param);
}

// 给URL添加参数,判断，选择添加？还是&
const addURLData = (url, data) => {
    if (!data) return '';
    const mark = url.includes('?') ? '&' : '?';
    return `${mark}${data}`;
}
export { serialize, addURLData, serializeJSON };