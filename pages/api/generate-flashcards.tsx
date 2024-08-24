import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import { generateFlashcards } from '../../lib/langchain';
import { extractTextFromPresentation } from '../../lib/extractText';

// Disable the default body parser to handle file uploads
export const config = {
    api: {
        bodyParser: false,
    },
};

interface FlashcardResponse {
    flashcards: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<FlashcardResponse | { message: string }>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error parsing file' });
        }

        const file = files.file as File;

        // Extract text from the uploaded file
        const text = await extractTextFromPresentation(file.filepath);

        // Generate flashcards using LangChain
        const flashcards = await generateFlashcards(text);

        res.status(200).json({ flashcards });
    });
}
