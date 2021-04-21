/**
 *  @param data 需要传入的参数，是对象格式
 *  @returns 返回拼接好的字符串，例如 name=alex&age=18
 */
function resolveData(data) {
    const arr = [];
    for (const key in data) {
        arr.push(`${key}=${data[key]}`)
    }
    return arr.join("&");
}

/**
 * 
 * @param {options}  参数：包括method url data success
 */

function ajax(options) {
    const xhr = new XMLHttpRequest();
    if (options.method.toUpperCase() === "GET") {
        // 如果是GET请求
        xhr.open(options.method, options.url + "?" + resolveData(options.data));
        xhr.send();
    } else {
        // 如果是POST请求，添加上请求头，send添加请求的参数
        xhr.open(options.method, options.url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(resolveData(options.data));
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 将返回的值序列化为JSON字符串返回，并执行success函数。
            const result = JSON.parse(this.responseText);
            options.success(result);
        }
    };
}