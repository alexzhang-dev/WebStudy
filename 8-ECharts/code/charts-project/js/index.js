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

    // 用户统计模块制作
    (function() {
        // 1. 实例化对象
        const myChart = echarts.init(document.querySelector(".users .bar"));
        // 2. 自定义配置
        const item = {
            name: '',
            value: 1200,
            // 柱子颜色
            itemStyle: {
                color: '#254065'
            },
            // 鼠标经过柱子颜色
            emphasis: {
                itemStyle: {
                    color: '#254065'
                }
            },
            // 工具提示隐藏
            tooltip: {
                extraCssText: 'opacity:0'
            },
        }

        const option = {
            tooltip: {
                trigger: 'item'
            },
            color: new echarts.graphic.LinearGradient(
                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                0, 0, 0, 1, [
                    { offset: 0, color: '#00fffb' }, // 0 起始颜色
                    { offset: 1, color: '#0061ce' } // 1 结束颜色
                ]
            ),
            // 直角坐标系内绘图网格（区域）
            grid: {
                top: '3%',
                right: '3%',
                bottom: '3%',
                left: '0%',
                //  图表位置紧贴画布边缘是否显示刻度以及label文字 防止坐标轴标签溢出跟grid 区域有关系
                containLabel: true,
                // 是否显示直角坐标系网格
                show: true,
                //grid 四条边框的颜色
                borderColor: 'rgba(0, 240, 255, 0.3)'
            },
            xAxis: [{
                type: 'category',
                data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
                axisTick: {
                    alignWithLabel: true
                }
            }],
            yAxis: [{
                // 使用类目，必须有data属性
                type: 'value',
                // 刻度设置
                axisTick: {
                    // 不显示刻度
                    show: false
                },
                // y坐标轴文字标签样式设置
                axisLabel: {
                    color: '#4c9bfd'
                },
                // y坐标轴颜色设置
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)',
                        // width:8,  x轴线的粗细
                        // opcity: 0,   如果不想显示x轴线 则改为 0
                    }
                },
                // y轴 分割线的样式 
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                }
            }],
            series: [{
                name: '',
                type: 'bar',
                barWidth: '60%',
                data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
            }]
        };
        // 3. 把配置给实例对象
        myChart.setOption(option);
    })();

    // 订单模块
    (function() {
        // 1. 动态渲染数据
        const data = {
            day365: { orders: '20,301,987', amount: '99834' },
            day90: { orders: '301,987', amount: '9834' },
            day30: { orders: '1,987', amount: '3834' },
            day1: { orders: '987', amount: '834' }
        }
        $.each(data, (index, element) => {
            const dataHTML = `<div class="data">
                        <div class="item">
                            <h4>${element.orders}</h4>
                            <span>
                  <i class="icon-dot" style="color: #ed3f35"></i>
                  订单量
                </span>
                        </div>
                        <div class="item">
                            <h4>${element.amount}</h4>
                            <span>
                  <i class="icon-dot" style="color: #eacf19"></i>
                  销售额(万元)
                </span>
                        </div>
                    </div>`
            $(".order .inner").append(dataHTML);
        });
        // 2. 隐藏其他，只显示第一个
        $(".order .data").eq(0).show().siblings(".data").hide();
        let auto_index = 0;
        // 3. 点击可以切换
        $(".filter").on("click", "a", function() {
            $(this).addClass("active").siblings().removeClass("active").parent().siblings(".data").eq($(this).index()).show().siblings(".data").hide();
            auto_index = $(this).index();
        });
        // 4. 不点击会自动播放
        let flag = true;

        function autoplay() {
            if (flag) {
                if (auto_index >= $(".order .filter a").length) {;
                    auto_index = 0;
                }
                $(".order .filter a").eq(auto_index).addClass("active").siblings().removeClass("active").parent().siblings(".data").eq(auto_index).show().siblings(".data").hide();
                auto_index++;
            }
        }
        $(".order").on("mouseover", function() {
            flag = false;
        });
        $(".order").on("mouseleave", function() {
            flag = true;
        });
        setInterval(autoplay, 1000);
    })();

    // 销售额统计模块
    (function() {
        var myChart = echarts.init(document.querySelector(".sales .line"));
        // 1. 准备数据
        const data = {
            year: [
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ],
            quarter: [
                [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
                [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
            ],
            month: [
                [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
                [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
            ],
            week: [
                [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
                [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
            ]
        };
        const data_d = ["year", "quarter", "month", "week"];
        // 2. 动态渲染图表
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['预期销售额', '实际销售额'],
                textStyle: {
                    color: '#4c9bfd' // 图例文字颜色
                },
                right: '10%' // 距离右边10%
            },
            grid: {
                top: '20%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                show: true, // 显示边框
                borderColor: '#012f4a', // 边框颜色
                containLabel: true // 包含刻度文字在内
            },
            xAxis: {
                type: 'category',
                data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                axisTick: {
                    show: false // 去除刻度线
                },
                axisLabel: {
                    color: '#4c9bfd' // 文本颜色
                },
                axisLine: {
                    show: false // 去除轴线
                },
                boundaryGap: false // 去除轴内间距
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false // 去除刻度
                },
                axisLabel: {
                    color: '#4c9bfd' // 文字颜色
                },
                splitLine: {
                    lineStyle: {
                        color: '#012f4a' // 分割线颜色
                    }
                }
            },
            color: ['#00f2f1', '#ed3f35'],
            // 图标数据
            series: [{
                // 这里面的data要是动态的
                name: '预期销售额',
                data: data.year[0],
                type: 'line',
                smooth: true
            }, {
                name: '实际销售额',
                data: data.year[1],
                type: 'line',
                smooth: true
            }]
        };
        // 2. 点击切换
        let auto_index = 0;
        $(".sales .caption").on("click", "a", function() {
            $(this).addClass("active").siblings().removeClass("active");
            // 设置图表里面的数据
            option.series[0].data = data[data_d[$(this).index() - 1]][0];
            option.series[1].data = data[data_d[$(this).index() - 1]][1];
            myChart.setOption(option);
            auto_index = $(this).index();
        });
        myChart.setOption(option);
        // 3. 定时切换
        let flag = true;

        function autoplay() {
            if (flag) {
                if (auto_index >= $(".sales .caption a").length) {
                    auto_index = 0;
                }
                $(".sales .caption a").eq(auto_index).addClass("active").siblings("a").removeClass("active");
                option.series[0].data = data[data_d[auto_index]][0];
                option.series[1].data = data[data_d[auto_index]][1];
                auto_index++;
            }
            myChart.setOption(option);
        };
        setInterval(autoplay, 1000);
        $(".sales").on({
            mouseover: () => {
                flag = false;
            },
            mouseleave: () => {
                flag = true;
            }
        });
    })();

    // 销售渠道模块雷达图
    (function() {
        const myChart = echarts.init(document.querySelector(".radar"));
        // Schema:
        // date,AQIindex,PM2.5,PM10,CO,NO2,SO2
        const dataBJ = [
            [55, 9, 56, 0.46, 18, 6, 1],

        ];

        const lineStyle = {
            normal: {
                width: 1,
                opacity: 0.5
            }
        };

        const option = {
            backgroundColor: '#161627',
            // visualMap: {
            //     show: true,
            //     min: 0,
            //     max: 20,
            //     dimension: 6,
            //     inRange: {
            //         colorLightness: [0.5, 0.8]
            //     }
            // },
            radar: {
                indicator: [
                    { name: 'AQI', max: 300 },
                    { name: 'PM2.5', max: 250 },
                    { name: 'PM10', max: 300 },
                    { name: 'CO', max: 5 },
                    { name: 'NO2', max: 200 },
                    { name: 'SO2', max: 100 }
                ],
                shape: 'circle',
                splitNumber: 5,
                name: {
                    textStyle: {
                        color: 'rgb(238, 197, 102)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: [
                            'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                            'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                            'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                        ].reverse()
                    }
                },
                splitArea: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(238, 197, 102, 0.5)'
                    }
                }
            },
            series: [{
                name: '北京',
                type: 'radar',
                lineStyle: lineStyle,
                data: dataBJ,
                symbol: 'none',
                itemStyle: {
                    color: '#F9713C'
                },
                areaStyle: {
                    opacity: 0.1
                }
            }, ]
        };
        myChart.setOption(option)
    })();
})