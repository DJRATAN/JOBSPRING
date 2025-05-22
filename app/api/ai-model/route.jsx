import { QUESTION_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai"

export async function POST(req) {
    // Assuming req.json() provides all necessary data
    const {
        jobPosition,
        jobDescription,
        companyName = '', // Default to empty string if not provided
        department = '',    // Default to empty string
        requiredExperience = 'Fresher', // Default for experience
        employmentType,     // This maps to 'type' in your original code
        location = '',      // Default to empty string
        salaryRange = 'Not specified', // Default for salary
        applicationDeadline = 'Not specified', // Default for deadline
        numberOfQuestions, // Default to 5 questions if not provided
        timeDuration = 30     // Default to 30 minutes if not provided
    } = await req.json();

    const FINAL_PROMT = QUESTION_PROMPT
        .replace('{{jobTitle}}', jobPosition || '')
        .replace('{{companyName}}', companyName)
        .replace('{{department}}', department)
        .replace('{{reqExperience}}', requiredExperience)
        .replace('{{employmentType}}', employmentType || '')
        .replace('{{location}}', location)
        .replace('{{salaryRange}}', salaryRange)
        .replace('{{applicationDeadline}}', applicationDeadline)
        .replace('{{jobDescription}}', jobDescription || '')
        .replace('{{noOfQuestions}}', (numberOfQuestions ?? 5).toString())
        .replace('{{timeDuration}}', timeDuration.toString());     // Ensure it's a string for replacement
    console.log(FINAL_PROMT)
    try {

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
        })
        const completion = await openai.chat.completions.create({
            // model: "google/gemini-2.5-pro-exp-03-25:free",
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
                { role: "user", content: FINAL_PROMT }
            ],
        })
        console.log(completion.choices[0].message)
        return NextResponse.json(completion.choices[0].message);
    } catch (e) {
        console.log(e)
        return NextResponse.json(e);
    }
}