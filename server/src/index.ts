import { Configuration, OpenAIApi } from 'openai'
import * as express from 'express'
import * as dotenv from 'dotenv'
import cors = require('cors')

dotenv.config()

// New OpenAI Configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
})

// New OpenAI Instance
const openAi = new OpenAIApi(configuration)

const port = 3001
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log('Middleware Fuck')
    next()
})

//Routes
app.get(`/`, async (req, res): Promise<void> => {
    res.status(200).send({
        message: `hello world`,
    })
})

app.post(`/`, async (req, res) => {
    try {
        console.log('🤢🤢🤢🤢 called')
        const prompt = req.body.prompt

        const response = await openAi.createCompletion({
            model: 'text-davinci-003',
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })

        res.status(200).send({
            bot: response.data.choices[0].text,
        })
    } catch (e) {
        console.log(e.response.data)
        res.status(500).send({ e })
    }
})

app.listen(port, () =>
    console.log(`Server is running on port http://localhost:${port}/`)
)
