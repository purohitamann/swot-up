import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import FlashcardForm from "@/components/FlahCardForm";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import Home from "../components/Home";
import { Spacer } from "@nextui-org/react";
import SafariBrowserFrame from "@/components/Window";
import { useState } from "react";
// import { Spacer } from "@nextui-org/theme";
export default function IndexPage() {
  const [flashcards, setFlashcards] = useState<string[]>([]);

  const handleFlashcardsGenerated = (newFlashcards: string[]) => {
    setFlashcards(newFlashcards);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Just in time to swot-up!&nbsp;</h1>
        <Spacer y={2} />
        <SafariBrowserFrame>
          <h1 className={title()}>Hello, World!</h1>
          {/* <Home /> */}
          <div>
            <h1>Flashcard Generator</h1>
            <FlashcardForm onFlashcardsGenerated={handleFlashcardsGenerated} />

            <div>
              {/* <h2>Generated Flashcards</h2> */}
              {flashcards.map((flashcard, index) => (
                <div key={index}>
                  <p>{flashcard}</p>
                </div>
              ))}
            </div>
          </div>
        </SafariBrowserFrame >
      </section>
    </DefaultLayout>
  );
}
