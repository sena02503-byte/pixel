let body = document.querySelector('body')
let start_btn = document.querySelector('.btn-12')
let btn_start = document.querySelector('.btn-start')
let container = document.querySelector('.container')
let board = document.querySelector('.board')
let btn_draw = document.querySelector('.btn_draw')
let input = document.querySelector('input')
let btn_eraser = document.querySelector('.btn_eraser')
let btn_reset = document.querySelector('.btn_reset')
let btn_fill = document.querySelector('.btn_fill')
let btn_save = document.querySelector('.btn-save')

let is_eraser = false
let is_mouseDown = false
let current_color = '#e66465'


start_btn.addEventListener('click', function(){
    anime({
        targets: '.btn-12, .btn-start',
        translateY: -1200,
        duration: 2000,
        easing: 'linear',
        complete:function(){
        btn_start.style.display = 'none',
        body.style.backgroundColor = '#000000'
        container.style.display = 'flex'
        CreateBoard()
           }
    })

})

function CreateBoard(){
    board.innerHTML = ''
    for(let i=0; i<1500;i++){
        let cell = document.createElement('div')
        cell.classList.add('cell')
        board.appendChild(cell)

        cell.addEventListener('mousedown', function(){
            if(is_mouseDown){
                cell.style.backgroundColor = is_eraser ? 'black' : current_color
            }
        })
    }
    let arr_color = JSON.parse(localStorage.getItem('save_picture'))
    if(arr_color){
        let cells = document.querySelectorAll('.cell')
        cells.forEach((cell, index)=> {
            cell.style.backgroundColor = arr_color[index]
        })
    }
}

input.addEventListener('input', function(){
    current_color = input.value
}) 
btn_draw.addEventListener('click', function(){
    is_eraser = false
    is_mouseDown = true
})

btn_eraser.addEventListener('click', function(){
    is_eraser = true
})


document.addEventListener('pointerdown', function(){
    is_mouseDown = true
})

document.addEventListener('pointerup', function(){
    is_mouseDown = false
})

document.addEventListener('pointerover', function(e){
    if(!is_mouseDown) return
    if(e.target.classList.contains("cell")){
        e.target.style.backgroundColor = is_eraser ? 'black' : current_color
    }
})

btn_reset.addEventListener('click', function(){
    let cells = document.querySelectorAll('.cell')
    console.log('1dmgr6')
    anime({
        targets: cells,
        backgroundColor: '#000000',
        duration: 500,
        delay: (item, index) => index * 0.5,
        easing: 'linear',
    })

})

btn_fill.addEventListener('click', function(){
    let cells = document.querySelectorAll('.cell')
    console.log('dfs98r2')
    anime({
        targets: cells,
        backgroundColor: current_color,
        duration: 500,
        delay: (item, index) => index * 0.5,
        easing: 'linear',
    })

})

btn_save.addEventListener('click', function(){
    let cell_colors = []
    let cells = document.querySelectorAll('.cell')
    // for(item in cells){
    //     cell_colors.push(cells[item].style.backgroundColor)
    // }
    cells.forEach(cell => {
        cell_colors.push(cell.style.backgroundColor || '#000000')})
    localStorage.setItem('save_picture', JSON.stringify(cell_colors))
    
    domtoimage.toPng(board)
    .then(function (dataUrl) {
        var img = new Image()
        img.src = dataUrl
        let link = document.createElement('a')
        link.download = 'picture.png'
        link.href = dataUrl
        link.click()
    })
    .catch(function (error) {
        console.error('Упс! Произошла ошибка скачивания', error)
    });
})