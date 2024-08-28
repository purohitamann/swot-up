import { useState } from 'react';

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [flashcards, setFlashcards] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) return;

        const formData = new FormData();
        formData.append('pdf', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        setFlashcards(result.flashcards);
    };

    return (
        <div>
            <h1>Upload a PDF and Generate Flashcards</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {flashcards && (
                <div>
                    <h2>Generated Flashcards:</h2>
                    <pre>{flashcards}</pre>
                </div>
            )}
        </div>
    );
}
