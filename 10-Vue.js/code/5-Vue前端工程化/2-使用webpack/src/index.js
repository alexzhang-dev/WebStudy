import $ from 'jquery';
import './css/style.css';
import './css/style2.less';
import './css/style3.scss';
// 引入单组件
import './components/App.vue';

$(() => {
    $('li:odd').css('backgroundColor', 'pink');
    $('li:even').css('backgroundColor', 'lightblue');
});

class Person {
    static name = "aa";
}

console.log(Person.name);