const BGG_GAME_URL = "https://boardgamegeek.com/boardgame";
const BGG_API_ROOT = "https://www.boardgamegeek.com/xmlapi2";
const BGG_SEARCH_BOARDGAMES = `${BGG_API_ROOT}/search?type=boardgame&query=`;
const BGG_GET_COLLECTION = `${BGG_API_ROOT}/collection?own=1&username=`;
const BGG_GET_USER = `${BGG_API_ROOT}/user?name=`;
const BGG_GET_GAME= `${BGG_API_ROOT}/thing?id=`;
const PROJECT_NAME = "bg_companion";
const MAX_SEARCH_RESULTS= 20
const WHATS_APP_LINK= 'https://wa.me/'

export const config = {
  BGG_API_ROOT,
  BGG_SEARCH_BOARDGAMES,
  BGG_GET_COLLECTION,
  BGG_GET_USER,
  PROJECT_NAME,
  BGG_GAME_URL,
  BGG_GET_GAME,
  MAX_SEARCH_RESULTS,
  WHATS_APP_LINK,
};
