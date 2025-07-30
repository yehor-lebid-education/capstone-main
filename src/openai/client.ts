import OpenAI from "openai";

const {
    OPENAI_API_KEY,
    OPENAI_TIMEOUT = 10000,
    OPENAI_MAX_RETRIES = 3,
} = process.env;

const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
    timeout: Number(OPENAI_TIMEOUT),
    maxRetries: Number(OPENAI_MAX_RETRIES),
});

export default client;