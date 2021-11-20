const quoteContainer = document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const vkBtn = document.getElementById('vk');
const loader = document.querySelector('.loader-container');
// Выполняем асинхронную функцию
async function getQuote(){
    loader.style.display = 'flex';
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'; //  помогает получать доступ к данным с других веб-сайтов, что обычно запрещено политикой происхождения веб-браузеров, путем проксирования запросов на эти сайты через сервер 
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json'; // Ссылка на апи, откуда мы хотим получить данные
    try{
        const response = await fetch(proxyUrl + apiUrl); // посылаем запрос и ждём ответа
        const data = await response.json(); // получаем ответ, декодированный в формате json
        writeQuote(data);
        loader.style.display = 'none';
    }catch(error) {
        getQuote(); // при ошибке вызываем заново эту же функцию, пытаясь получить данные
        console.log('whoops, no quote',error); // вывод ошибки в консоль
    }
}

getQuote();

function writeQuote(data){
    data.quoteText.length > 100 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
    quoteText.innerHTML = data.quoteText;
    // Получаем данные, если автор не указан, то записываем в html неизвестен, иначе вывоидм
    authorText.innerHTML = data.quoteAuthor === '' ? 'Неизвестен' : data.quoteAuthor;
}

vkBtn.addEventListener('click', () => {
    window.open('https://vk.com/frdvmn');
});
newQuoteBtn.addEventListener('click', () => {
    getQuote();
});
