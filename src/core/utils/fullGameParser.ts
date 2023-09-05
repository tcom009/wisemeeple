import { ThingItemI, ParsedThing } from "../models/models";


export const fullGameParser = (game: ThingItemI) : ParsedThing => {
    
    const gameLinks = game.link.map((link: { attr: { type: string; id: string; value: string } }) => {
        return {
            type: link.attr.type,
            value: link.attr.value
        }
    })
    const boardgamedesigner = gameLinks.filter(link => link.type === "boardgamedesigner");
    const boardgamecategory = gameLinks.filter(link => link.type === "boardgamecategory");
    const boardgamemechanic = gameLinks.filter(link => link.type === "boardgamemechanic");
    const boardgamefamily = gameLinks.filter(link => link.type === "boardgamefamily");
    const parsedGame = {
        id: game.attr.id,
        name: Array.isArray(game.name) ? game?.name[0]?.attr.value : game.name.attr.value,
        yearpublished: game.yearpublished.attr.value,
        image: game?.image?.text ?? "",
        description: game.description.text,
        minplayers: game.minplayers.attr.value,
        maxplayers: game.maxplayers.attr.value,
        playingtime: game.playingtime.attr.value,
        minplaytime: game.minplaytime.attr.value,
        maxplaytime: game.maxplaytime.attr.value,
        minage: game.minage.attr.value,
        boardgamedesigner: boardgamedesigner.map((designer:{type: string, value: string}) => designer.value),
        boardgamecategory: boardgamecategory.map((category:{type: string, value: string}) => category.value),
        boardgamemechanic: boardgamemechanic.map((mechanic:{type: string, value: string}) => mechanic.value),
        boardgamefamily: boardgamefamily.map((family:{type: string, value: string}) => family.value),
        }   
    return parsedGame
}
