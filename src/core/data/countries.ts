import countryList from './countryList.json'
import countryFlagEmoji from "country-flag-emoji";
type country = {
    name: string
    code: string
}


export const countries: {label: string, value: string, flag: string }[] = countryList
    .map((country: country) => ({
        label: country.name,
        value: country.code, 
        flag: countryFlagEmoji.get(country.code)?.emoji 
    }))


export const countriesMap: Map<string, string> = new Map();
countryList.forEach((country: country) => {
  countriesMap.set(country.code, country.name);
});