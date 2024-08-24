import { OpenAI } from 'langchain';
import { TextSplitter } from 'langchain/splitters';
import { Chain } from 'langchain/chains';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

export async function generateFlashcards(text: string): Promise<string[]> {
  // Split the input text into manageable chunks
  const splitter = new TextSplitter({ chunkSize: 300 });
  const chunks = splitter.split(text);

  // Define a chain to generate flashcards for each chunk
  const chain = new Chain([
    {
      inputKey: 'chunk',
      prompt: 'Create flashcards from the following text:',
      maxTokens: 100,
      stopSequences: ['\n\n'],
      temperature: 0.7,
    },
  ]);

  const flashcards: string[] = [];

  for (const chunk of chunks) {
    const response = await chain.run({
      input: { chunk },
      model: openai,
    });

    flashcards.push(response.output as string);
  }

  return flashcards;
}
