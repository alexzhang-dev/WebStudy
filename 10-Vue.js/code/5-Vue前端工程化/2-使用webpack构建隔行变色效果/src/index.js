import $ from 'jquery';
import './css/style.css';
import './css/index.less';
import './css/index2.scss';

$(() => {
    $('li:odd').css('backgroundColor', 'red');
    $('li:even').css('backgroundColor', 'lightblue');
})

class Person {
    static info = 'aaa'
}
console.log(Person.info);