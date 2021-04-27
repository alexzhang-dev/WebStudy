const padZero = (n) => {
    if (n < 10) {
        return "0" + n;
    }
    return n;
}

exports.dateFormat = () => {
    const date = new Date();
    const y = date.getFullYear();
    const m = padZero(date.getMonth());
    const d = padZero(date.getDate());
    const hh = padZero(date.getHours());
    const mm = padZero(date.getMinutes());
    const ss = padZero(date.getSeconds());
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}