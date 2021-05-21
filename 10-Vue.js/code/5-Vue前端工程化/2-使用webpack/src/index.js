import $ from 'jquery';

$(() => {
    $('li:odd').css('backgroundColor', 'pink');
    $('li:even').css('backgroundColor', 'lightblue');
})