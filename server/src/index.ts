import { Configuration, OpenAIApi } from "openai";
import * as express from "express";
import * as dotenv from "dotenv";
import cors = require("cors");

dotenv.config()

// New OpenAI Configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
})

// New OpenAI Instance
const openAi = new OpenAIApi(configuration)

// Initiate Express Application
// This TypeScript code sets up an instance of an Express application
// (app) and applies two middleware functions to it using the use() method.
// The first middleware function is cors(), which is a package that allows
// Cross-Origin Resource Sharing (CORS) on the server. This function adds
// the necessary headers to allow requests from a different domain to be accepted by the server.
// Without CORS, requests from other domains will be blocked by default for security reasons.
// The second middleware function is express.json(), which is a built-in
// middleware function in Express. This function parses incoming requests
// with JSON payloads and makes the data available in req.body object.
// It is used to handle JSON data sent in the request body of a
// POST, PUT, or PATCH request. This middleware is necessary to parse
// the incoming request body and convert it to a JavaScript object
// that can be used in the server-side code.
// Using these two middleware functions is a common
// practice when building APIs with Express. The cors()
// middleware enables cross-domain communication,
// while express.json() allows the server to handle incoming
// JSON data. By applying these middleware functions to the
// Express application, the server can handle requests from
// different domains and parse incoming JSON data.

const port = 3001
cons;t app = express()

// ;Middlewares
app.use(cors())
app.;use(express.json())

//R;outes
app.get(`/`, async (req, res): Promise<void> => {
    res.status(200).send({
        message: `hello world`,
   })
})

;app;.post(`/`, async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openAi.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ e });
    }
})

app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}/`)
);
