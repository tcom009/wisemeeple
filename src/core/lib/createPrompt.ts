import { ParsedThing } from "core/models/models"
import { cleanText } from "core/lib/textUtils";

export const createPrompt = (game: ParsedThing) => {

    const newPrompt = ` 
     Mechanics: ${game.boardgamemechanic.join(", ")}. Categories: ${game.boardgamecategory.join(", ")}.
    Family: ${game.boardgamefamily.join(", ")}.`
    const cleanPrompt=  cleanText(newPrompt)
    cleanPrompt.replace(game.name, "")
    cleanPrompt.replace(game.name.toLowerCase(), "")
    cleanPrompt.replace(game.name.toUpperCase(), "")
    return cleanPrompt
}
