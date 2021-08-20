//создать игру "КаменьНожницыБумага"
let game = document.querySelector('.game'),//выбираем все поле для игры
res = document.querySelector('.res'), //здесь будем выводить результат: кто победил
buttGame = document.querySelector('.new_game'),//кнопка для запуска новой игры
fields = document.querySelectorAll('.field'),//выбираем все поля, для zero и cross
step = false, //по переменной step определяем чей в данный момент ход
count = 0,
zero = '<svg class="zero"><circle r="45" cx="58" cy="58" stroke="OrangeRed" stroke-width="11" fill="none" stroke-linecap="round"/></svg>',
cross ='<svg class="cross"><line class="first" x1="15" y1="15" x2="100" y2="100" stroke="gray" stroke-width="11" stroke-linecap="round"/><line class="second" x1="100" y1="15" x2="15" y2="100" stroke="DarkRed" stroke-width="10" stroke-linecap="round"/></svg>';

function getCross(target)
{
    target.innerHTML = cross;
    target.classList.add('x');
    let soundCross = new Audio('sound/cross.mp3');
    soundCross.play();
    count++;
}
function getZero(target)
{
    target.innerHTML = zero;
    target.classList.add('o');
    let soundZero = new Audio('sound/zero.mp3');
    soundZero.play();
    count++;
}
function getInit(e)
{ //для инициализации игры
    if(!step) getCross(e.target); //e.target передаем объект, на котором сработало событие
    else getZero(e.target);
    step = !step;
    getWin();
}
function getNewGame()
{
    step = false;
    count = 0;
    res.innerText = 'Новая игра началась';
    fields.forEach(item =>{
        item.innerHTML = '';
        item.classList.remove('x','o','active');
    });
    //game.addEventListener('click', init);//если не работает, то дабавить эту строку
}
function getWin()
{
    let combination = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8],
    ];
    for(let i=0; i<combination.length; i++)
    {
        if(fields[combination[i][0]].classList.contains('x') &&
        fields[combination[i][1]].classList.contains('x') &&
        fields[combination[i][2]].classList.contains('x'))
        {
            setTimeout(()=>{ //нужна задержка, чтобы значек дорисовался
                fields[combination[i][0]].classList.add('active');
                fields[combination[i][1]].classList.add('active'); 
                fields[combination[i][2]].classList.add('active');
                res.innerText = "Выиграли крестики";  
            },1000);
            game.removeEventListener('click', getInt);//после победы нельзя рисовать
        }
        else if(fields[combination[i][0]].classList.contains('o') &&
            fields[combination[i][1]].classList.contains('o') &&
            fields[combination[i][2]].classList.contains('o'))
        {
                setTimeout(()=>{ //нужна задержка, чтобы значек дорисовался
                    fields[combination[i][0]].classList.add('active');
                    fields[combination[i][1]].classList.add('active'); 
                    fields[combination[i][2]].classList.add('active');
                    res.innerText = "Выиграли нули";  
                },1000);
                game.removeEventListener('click', getInt);
            }
        else if(count == 9)
        {
            setTimeout(()=>{ //нужна задержка, чтобы значек дорисовался
                res.innerText = 'Ничья'; 
            },1000);
            game.removeEventListener('click', getInit);
        }     
    } 
    
}
buttGame.addEventListener('click', getNewGame);
game.addEventListener('click', getInit);
//console.log(c.getTotalLength());
