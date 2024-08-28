import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import Configuration from 'openai';
import OpenAIApi from 'openai';
import { promisify } from 'util';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi({
    apiKey: configuration.apiKey,
});

const upload = multer({ dest: '/tmp' });

// Helper function to extract text from PDF
async function extractTextFromPDF(pdfPath: string): Promise<string> {
    // eslint-disable-next-line
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    return data.text;
}

// Helper function to create flashcards using OpenAI
async function createFlashcardsFromText(text: string): Promise<string> {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Create flashcards from the following text:\n\n${text}`,
    });
    return response.data.choices[0].text;
}

export const config = {
    api: {
        bodyParser: false, // Disabling Next.js body parser to handle file uploads
    },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return new Promise<void>((resolve, reject) => {
        upload.single('pdf')(req, res, async (err) => {
            if (err) {
                return reject(res.status(500).send('File upload failed.'));
            }

            if (!req.file) {
                return reject(res.status(400).send('No file uploaded.'));
            }

            const filePath = path.resolve(req.file.path);

            try {
                const text = await extractTextFromPDF(filePath);
                const flashcards = await createFlashcardsFromText(text);

                res.status(200).json({ flashcards });
                resolve();
            } catch (error) {
                res.status(500).send('Error processing the PDF.');
                reject(error);
            } finally {
                fs.unlink(filePath, (err) => {
                    if (err) console.error('Error cleaning up file:', err);
                });
            }
        });
    });
}
