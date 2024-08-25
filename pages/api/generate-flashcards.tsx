// pages/api/upload.ts

import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import { OpenAI } from 'langchain/llms/openai';
import { promisify } from 'util';

const upload = multer({ dest: '/tmp' });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const filePath = req.file?.path || '';
        const text = await extractTextFromPDF(filePath);
        const flashcards = await createFlashcardsFromText(text);

        // Clean up the temporary file
        await promisify(fs.unlink)(filePath);

        return res.status(200).json({ flashcards });
    } catch (error) {
        return res.status(500).json({ message: 'Error processing the PDF', error: error.message });
    }
};

// Helper to extract text from PDF
async function extractTextFromPDF(pdfPath: string): Promise<string> {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    return data.text;
}

// Helper to create flashcards using LangChain and OpenAI
async function createFlashcardsFromText(text: string): Promise<string> {
    const openai = new OpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY!,
    });

    const prompt = `Create flashcards from the following text:\n\n${text}`;
    const response = await openai.call({ prompt });

    return response;
}

// Disable Next.js default body parsing to handle the file upload
export const config = {
    api: {
        bodyParser: false,
    },
};

// Use Multer middleware
export default upload.single('pdf')(handler as any);
