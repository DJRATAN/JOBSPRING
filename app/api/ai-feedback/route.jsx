import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
    const { conversation } = await req.json();
    const FEEDBACK = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation))

    try {
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,

        })

        const completion = await openai.chat.completions.create({
            model: "google/gemini-flash-1.5",
            // model: "meta-llama/llama-4-scout-17b-16e-instruct",

            messages: [
                { role: "user", content: FEEDBACK },
            ],
        })
        console.log(completion.choices[0].message)
        return NextResponse.json(completion.choices[0].message);

    } catch (err) {
        console.log(err);
        return NextResponse.json(err);
    }
}