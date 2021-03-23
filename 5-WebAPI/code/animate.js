function animate(obj, target, callback) {
    clearInterval(obj.move);
    obj.move = setInterval(function() {
        // 缓动动画核心算法：核心算法：（目标值 - 现在的位置） / 10 作为每次移动的步长
        // 把步长改为整数，不要出现小数的问题
        // 如果是正值，就往上取整，如果是负值，就往下取整
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + "px";
        if (obj.offsetLeft == target) {
            clearInterval(obj.move);
            if (callback) {
                callback();
            }
        }
    }, 15);
}