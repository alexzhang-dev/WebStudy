$(() => {
    // 监控区域模块制作
    $(".monitor .content").eq(0).show();
    (() => {
        // 上方故障/异常切换
        $(".monitor .tabs").on("click", "a", function() {
            $(this).addClass("active").siblings().removeClass("active");
            $(".monitor .content").eq($(this).index()).show().siblings(".content").hide();
        });
        // 动画
        $(".marquee-view .marquee").each(function() {
            const rows = $(this).children().clone();
            $(this).append(rows);
        });
    })();

    // 点位统计模块制作
    // 需要用到ECharts
    // 点位分布统计模块
    (function() {
        // 1. 实例化对象
        var myChart = echarts.init(document.querySelector(".pie"));
        // 2. 指定配置项和数据
        var option = {
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // 注意颜色写的位置
            color: [
                "#006cff",
                "#60cda0",
                "#ed8884",
                "#ff9f7f",
                "#0096ff",
                "#9fe6b8",
                "#32c5e9",
                "#1d9dff"
            ],
            series: [{
                name: "点位统计",
                type: "pie",
                // 如果radius是百分比则必须加引号
                radius: ["10%", "70%"],
                center: ["50%", "50%"],
                roseType: "radius",
                data: [
                    { value: 20, name: "云南" },
                    { value: 26, name: "北京" },
                    { value: 24, name: "山东" },
                    { value: 25, name: "河北" },
                    { value: 20, name: "江苏" },
                    { value: 25, name: "浙江" },
                    { value: 30, name: "四川" },
                    { value: 42, name: "湖北" }
                ],
                // 修饰饼形图文字相关的样式 label对象
                label: {
                    fontSize: 10
                },
                // 修饰引导线样式
                labelLine: {
                    // 连接到图形的线长度
                    length: 6,
                    // 连接到文字的线长度
                    length2: 8
                }
            }]
        };

        // 3. 配置项和数据给我们的实例化对象
        myChart.setOption(option);
        // 4. 当我们浏览器缩放的时候，图表也等比例缩放
        window.addEventListener("resize", function() {
            // 让我们的图表调用 resize这个方法
            myChart.resize();
        });
    })();
})