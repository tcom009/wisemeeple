import { useState } from "react"
import { View } from "./ViewControls";

export const useViewControls = () =>{
    const [view, setView] = useState<View>(View.GRID);
    return {
        view,
        setView,
    }
}
