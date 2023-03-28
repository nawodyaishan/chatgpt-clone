const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

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