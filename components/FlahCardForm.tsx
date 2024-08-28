import { useState, ChangeEvent, FormEvent } from 'react';

// Define the props interface
interface FlashcardFormProps {
    onFlashcardsGenerated: (flashcards: string[]) => void;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({ onFlashcardsGenerated }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        onFlashcardsGenerated(data.flashcards);
    };

    return (
        <div>
            <h2>Upload Your Presentation or Notes</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept=".ppt,.pptx,.txt,.pdf" />
                <button type="submit">Generate Flashcards</button>
            </form>
        </div>
    );
};

export default FlashcardForm;
