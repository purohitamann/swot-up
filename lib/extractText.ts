import fs from 'fs';
import { parse } from 'pptx-parser';

export async function extractTextFromPresentation(filePath: string): Promise<string> {
  const data = fs.readFileSync(filePath);
  const presentation = await parse(data);

  let text = '';

  presentation.slides.forEach((slide) => {
    slide.texts.forEach((textElement) => {
      text += textElement.text + ' ';
    });
  });

  return text;
}
