import $ from 'jquery';
import './css/style.css';
import './css/style2.less';
import './css/style3.scss';
// 导入 Vue 构造函数
import Vue from 'vue';
// 引入单组件
import App from './components/App.vue';

$(() => {
    $('li:odd').css('backgroundColor', 'pink');
    $('li:even').css('backgroundColor', 'lightblue');
});

class Person {
    static name = "aa";
}

console.log(Person.name);

const vm = new Vue({
    // 指定控制区域
    el: '#app',
    // 通过 render 函数，把指定组件渲染到 el 区域
    render: h => h(App)
});