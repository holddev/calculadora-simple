const $buttonMode = document.querySelector('.mode')
const $wrapper = document.querySelector('.wrapper')

$buttonMode.addEventListener('click',()=>{
    $buttonMode.classList.toggle('active')
    $wrapper.classList.toggle('active')
})