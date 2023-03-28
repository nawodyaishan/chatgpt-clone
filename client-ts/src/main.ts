import bot from '../assets/bot.svg'
import user from '../assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval: NodeJS.Timer

function loader(element: Element) {
    element.textContent = ''
    loadInterval = setInterval(() => {
        element.textContent += '.'

        // resetting Text
        if (element.textContent === '....') {
            element.textContent = ''
        }
    }, 300)
}

// Generating Text Output Periodically
function typeText(element: Element, text: string) {
    let index = 0
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
function generateUniqueId() {
    const timeStamp: number = Date.now()
    const randomNumber: number = Math.random()
    const hexadecimalString: string = randomNumber.toString(16)

    return `id-${timeStamp}-${hexadecimalString}`
}

function chatStripe(
    isAi: boolean,
    aiGeneratedMessage: FormDataEntryValue | null,
    uniqueId?: string
) {
    return `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${aiGeneratedMessage}</div>
            </div>
        </div>
    `
}

const handleSubmit = async (event: Event): Promise<void | Error> => {
    event.preventDefault()

    if (!form) return Error(`Form element error`)
    const data: FormData = new FormData(form)

    // adding user's chat stripe
    if (!chatContainer) return Error(`Form element error`)
    chatContainer.innerHTML += chatStripe(false, data.get('promt'))
    form.reset()

    // adding bot's chat stripe
    if (!chatContainer) return Error(`Form element error`)
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, '', uniqueId)

    chatContainer.scrollTop += chatContainer.scrollTop

    const messageDiv = document.getElementById(generateUniqueId())

    if (!messageDiv) return Error(`Form element error`)
    loader(messageDiv)

    // fetch data from server
    const response = await fetch(`http://localhost:3001`, {
        method: `POST`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            prompt: data.get('prompt'),
        }),
    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = ''

    if (response.ok) {
        const data = await response.json()
        const parsedData = data.bot.trim()
        typeText(messageDiv, parsedData)
    } else {
        const error = await response.text()
        messageDiv.innerHTML = `Something Went Wrong ${error}`
    }
}

// Listener for submit events
form?.addEventListener('submit', handleSubmit)
form?.addEventListener('keyup', (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
        handleSubmit(event)
    }
})
