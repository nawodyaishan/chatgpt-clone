// import bot from '../assets/bot.svg'
// import user from '../assets/user.svg'

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function Loader(element: Element) {
    element.textContent = '';
    loadInterval = setInterval(() => {
        element.textContent += '.'

        // resetting Text
        if (element.textContent === '....') {
            element.textContent = ''
        }
    }, 300)
}

// Generating Text Output Periodically
function TypeText(element: Element, text: string) {
    let index = 0;
    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}

// Unique ID for every message
function GenerateUniqueId() {
    const timeStamp: number = Date.now()
    const randomNumber: number = Math.random()
    const hexadecimalString: string = randomNumber.toString(16)

    return `id-${timeStamp}-${hexadecimalString}`
}