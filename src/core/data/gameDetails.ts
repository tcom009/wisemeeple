import { values } from "lodash";

interface DataI {
  label: string;
  value: string;
}

export const gameCondition = [
  { label: "Nuevo(Sellado)", value: "1" },
  { label: "Nuevo(abierto)", value: "5" },
  { label: "Poco uso", value: "2" },
  { label: "Uso medio", value: "3" },
  { label: "Bastante usado", value: "4" },
];
export const languageDependency = [
  { label: "Dependencia de idioma nula", value: "1" },
  { label: "Dependencia de idioma baja", value: "2" },
  { label: "Dependencia de idioma media", value: "3" },
  { label: "Dependencia de idioma alta", value: "4" },
  { label: "No se puede jugar en otro idioma", value: "5" },
];

export const languages = [
  { label: "Español", value: "1" },
  { label: "Inglés", value: "2" },
  { label: "Francés", value: "3" },
  { label: "Portugués", value: "4" },
  { label: "Italiano", value: "5" },
  { label: "Chino", value: "6" },
  { label: "Japonés", value: "7" },
  { label: "Otro Idioma", value: "8" },
];

export const languageMap: Map<string, string> = new Map();
languages.forEach((language: DataI) => {
  languageMap.set(language.value, language.label);
});

export const conditionMap: Map<string, string> = new Map();
gameCondition.forEach((condition: DataI) => {
  conditionMap.set(condition.value, condition.label);
});
export const languageDependencyMap: Map<string, string> = new Map();
languageDependency.forEach((language: DataI) => {
  languageDependencyMap.set(language.value, language.label);
});
