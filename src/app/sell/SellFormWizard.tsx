"use client";
import { Wizard } from "react-use-wizard";
import SellForm from "./SellForm";
import GameDetailsForm from "./GameDetailsForm";
import { useState } from "react";
import { ParsedThing } from "@/core/models/models";
interface StateI {
  selectedGame: ParsedThing;
}

const initialState : StateI= {
  selectedGame: {
    id: "",
    name: "",
    description: "",
    minplayers: "",
    maxplayers: "",
    playingtime: "",
    minage: "",
    minplaytime: "",
    maxplaytime: "",
    boardgamedesigner: [""],
    boardgamecategory: [""],
    boardgamemechanic: [""],
    boardgamefamily: [""]
  }
}
export default function SellFormWizard() {
  const [state, setState] = useState<StateI>(initialState);
  const { selectedGame } = state;

  const setSelectedGame = (selectedGame: ParsedThing) => {
    setState((prevState) => ({ ...prevState, selectedGame }));
  };

  return (
    <Wizard>
      <SellForm setSelectedGame={setSelectedGame} />
      <GameDetailsForm selectedGame={selectedGame} />
    </Wizard>
  );
}
