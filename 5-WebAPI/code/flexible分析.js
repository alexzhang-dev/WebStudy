(function flexible(window, document) {
    // 获取 DOM 顶级元素： HTML
    var docEl = document.documentElement
        // dpr：物理像素比，如果能拿到，就用，拿不到就用1
    var dpr = window.devicePixelRatio || 1

    // adjust body font size   设置body的字体大小
    function setBodyFontSize() {
        // 如果页面中有body元素，就设置body的字体大小
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        } else {
            // 如果没有拿到body，这是因为页面元素还没加载完成
            // 所以设置DOMContentLoaded事件，等待DOM元素加载完毕之后再设置大小
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10    设置HTML元素的文字大小
    function setRemUnit() {
        // HTML的宽度除以10，把整个页面分为了10等份，1份作为1个rem的大小
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize  如果页面尺寸发生变化，那么就重新设置rem的大小
    window.addEventListener('resize', setRemUnit)
        // pageshow事件是重新加载页面触发的事件
    window.addEventListener('pageshow', function(e) {
        // 如果是从缓存触发的页面，也重新设置rem
        if (e.persisted) {
            setRemUnit()
        }
    })

    // detect 0.5px supports   有一些移动端的浏览器不支持0.5像素的写法
    // 以下代码用于修复一些浏览器不支持0.5px
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))