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
        const option = {
            tooltip: {
                show: false,
                // 控制提示框组件的显示位置
                position: ['60%', '10%'],
            },
            radar: {
                center: ['50%', '50%'],
                // 外半径占据容器大小
                radius: '65%',
                // 雷达图的指示器 内部填充数据
                indicator: [
                    { name: '机场', max: 100 },
                    { name: '商场', max: 100 },
                    { name: '火车站', max: 100 },
                    { name: '汽车站', max: 100 },
                    { name: '地铁', max: 100 }
                ],
                shape: 'circle',
                // 指示器轴的分割段数
                splitNumber: 4,
                name: {
                    // 修饰雷达图文本颜色
                    textStyle: {
                        color: '#4c9bfd'
                    }
                },
                // 坐标轴在 grid 区域中的分隔线（圆圈）
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        // width: 2,
                        // type: 'dashed'
                    }
                },
                splitArea: {
                    show: false
                },
                // 坐标轴轴线相关设置(竖线)axisLine
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                            // width: 1,
                            // type: 'solid'
                    }
                },
            },
            series: [{
                name: '',
                type: 'radar',
                // 区域线条颜色
                lineStyle: {
                    normal: {
                        color: '#fff',
                        width: 1
                    }
                },
                data: [
                    [55, 19, 56, 11, 34]
                ],
                itemStyle: {
                    color: '#F9713C'
                },
                // 区域背景颜色
                areaStyle: {
                    color: 'rgba(238, 197, 102, 0.6)',
                },
                symbol: 'circle',
                // 拐点的大小  
                symbolSize: 8,
                // 小圆点（拐点）设置为白色
                itemStyle: {
                    color: '#fff'
                },
                // 在圆点上显示相关数据
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 12
                },
            }, ]
        };
        myChart.setOption(option)
    })();

    // 进度模块
    (function() {
        const myChart = echarts.init(document.querySelector(".quarter .gauge"));
        const option = {
            series: [{
                type: 'pie',
                // 放大图形
                radius: ['130%', '150%'],
                // 移动下位置  套住50%文字
                center: ['48%', '80%'],
                label: {
                    normal: {
                        show: false
                    }
                },
                // 起始角度，支持范围[0, 360]
                startAngle: 180,
                // 鼠标经过不变大
                hoverOffset: 0,
                data: [{
                        value: 100,
                        itemStyle: {
                            // 颜色渐变#00c9e0->#005fc1
                            color: new echarts.graphic.LinearGradient(
                                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                                0,
                                0,
                                0,
                                1, [
                                    { offset: 0, color: "#00c9e0" }, // 0 起始颜色
                                    { offset: 1, color: "#005fc1" } // 1 结束颜色
                                ]
                            )
                        }
                    },
                    { value: 100, itemStyle: { color: '#12274d' } },
                    { value: 200, itemStyle: { color: 'transparent' } } // 透明隐藏第三块区域
                ],

            }]
        };
        myChart.setOption(option);
    })();

    // 全国热榜
    (function() {
        // 1. 通过ajax获取后台的数据，这里仅作模拟
        const hotData = [{
                city: '北京', // 城市
                sales: '25, 179', // 销售额
                flag: true, //  上升还是下降
                brands: [ //  品牌种类数据
                    { name: '可爱多', num: '9,086', flag: true },
                    { name: '娃哈哈', num: '8,341', flag: true },
                    { name: '喜之郎', num: '7,407', flag: false },
                    { name: '八喜', num: '6,080', flag: false },
                    { name: '小洋人', num: '6,724', flag: false },
                    { name: '好多鱼', num: '2,170', flag: true },
                ]
            },
            {
                city: '河北',
                sales: '23,252',
                flag: false,
                brands: [
                    { name: '可爱多', num: '3,457', flag: false },
                    { name: '娃哈哈', num: '2,124', flag: true },
                    { name: '喜之郎', num: '8,907', flag: false },
                    { name: '八喜', num: '6,080', flag: true },
                    { name: '小洋人', num: '1,724', flag: false },
                    { name: '好多鱼', num: '1,170', flag: false },
                ]
            },
            {
                city: '上海',
                sales: '20,760',
                flag: true,
                brands: [
                    { name: '可爱多', num: '2,345', flag: true },
                    { name: '娃哈哈', num: '7,109', flag: true },
                    { name: '喜之郎', num: '3,701', flag: false },
                    { name: '八喜', num: '6,080', flag: false },
                    { name: '小洋人', num: '2,724', flag: false },
                    { name: '好多鱼', num: '2,998', flag: true },
                ]
            },
            {
                city: '江苏',
                sales: '23,252',
                flag: false,
                brands: [
                    { name: '可爱多', num: '2,156', flag: false },
                    { name: '娃哈哈', num: '2,456', flag: true },
                    { name: '喜之郎', num: '9,737', flag: true },
                    { name: '八喜', num: '2,080', flag: true },
                    { name: '小洋人', num: '8,724', flag: true },
                    { name: '好多鱼', num: '1,770', flag: false },
                ]
            },
            {
                city: '山东',
                sales: '20,760',
                flag: true,
                brands: [
                    { name: '可爱多', num: '9,567', flag: true },
                    { name: '娃哈哈', num: '2,345', flag: false },
                    { name: '喜之郎', num: '9,037', flag: false },
                    { name: '八喜', num: '1,080', flag: true },
                    { name: '小洋人', num: '4,724', flag: false },
                    { name: '好多鱼', num: '9,999', flag: true },
                ]
            }
        ];
        $.each(hotData, (index, element) => {
            // 2. 动态渲染上方sup模块
            const supHTML = `<li>
                            <span>${element.city}</span>
                            <span>${element.sales}<s class="icon-up"></s></span>
                        </li>`
            $(".top .sup").append(supHTML);
        });
        // 默认只渲染第一组也就是北京的数据
        $(".top .sup li").eq(0).addClass("active");
        // 使用函数式变成提高效率和可读性
        function loadSubData(subData) {
            $.each(subData, (index, element) => {
                let upOrDown = `<s class="icon-down"></s>`;
                if (element.flag) {
                    upOrDown = `<s class="icon-up"></s>`
                }
                const subHTML = `<li><span>${element.name}</span><span> ${upOrDown}</span></li>`;
                $(".top .sub").append(subHTML);
            });
        }
        loadSubData(hotData[0].brands);

        function clearSubData() {
            $(".top .sub").html("");
        }
        let auto_num = 0;
        // 3. 点击不同的城市渲染不同的数据
        $(".top .sup").on("click", "li", function() {
            $(this).addClass("active").siblings("li").removeClass("active");
            clearSubData();
            loadSubData(hotData[$(this).index()].brands);
            auto_num = $(this).index();
        });
        // 4. 如果移入这个区域，就停止自动播放，反之自动播放
        let flag = true;

        function autoplay() {
            if (flag) {
                if (auto_num >= $(".top .sup li").length) {
                    auto_num = 0;
                }
                $(".top .sup li").eq(auto_num).addClass("active").siblings("li").removeClass("active");
                clearSubData();
                loadSubData(hotData[auto_num].brands);
                auto_num++;
            }
        }

        $(".top").on({
            mouseenter: () => {
                flag = false;
            },
            mouseleave: () => {
                flag = true;
            }
        });
        setInterval(() => {
            autoplay();
        }, 1000)
    })();
})