import { ParsedThing } from "core/models/models"
import { cleanText } from "core/lib/textUtils";

export const createPrompt = (game: ParsedThing) => {
    const newPrompt = `Boardgame: ${game.name}. Description: ${game.description}. Year Published: ${game.yearpublished}
    Designers: ${game.boardgamedesigner.join(", ")}. Mechanics: ${game.boardgamemechanic.join(", ")}. Categories: ${game.boardgamecategory.join(", ")}.
    Family: ${game.boardgamefamily.join(", ")}.`
    const cleanPrompt=  cleanText(newPrompt)
    return cleanPrompt
}
