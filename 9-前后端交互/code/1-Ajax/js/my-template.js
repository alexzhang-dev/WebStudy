function template(selector, data) {
    let HTMLStr = document.querySelector(`#${selector}`).innerHTML;
    const pattern = /{{\s*([a-zA-Z]+)\s*}}/;
    let patternResult = null;
    while (patternResult = pattern.exec(HTMLStr)) {
        HTMLStr = HTMLStr.replace(patternResult[0], data[patternResult[1]]);
    }
    return HTMLStr;
}