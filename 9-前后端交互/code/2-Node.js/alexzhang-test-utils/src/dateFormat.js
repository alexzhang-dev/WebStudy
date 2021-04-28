const dateFormat = (date) => {
    const YYYY = date.getFullYear();
    const MM = padZero(date.getMonth() + 1);
    const DD = padZero(date.getDate());
    const HH = padZero(date.getHours());
    const mm = padZero(date.getMinutes());
    const ss = padZero(date.getSeconds());
    return `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`;
}

const padZero = (n) => {
    return n < 10 ? '0' + n : n;
}

module.exports = {
    dateFormat
}