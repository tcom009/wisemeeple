"use client";
import { Slider, Box } from "@radix-ui/themes";

interface PropsI {
  handleYearChange: any;
}

const sliderSlyle = {width:"10rem"}
export default function YearSlider({ handleYearChange }: PropsI) {
  const MIN_YEAR = 2010;
  const MAX_YEAR = 2022;
  const DEFAULT_YEAR = 2015;

  return (
    <Box>
      <Slider
        defaultValue={[DEFAULT_YEAR]}
        min={MIN_YEAR}
        max={MAX_YEAR}
        radius={"large"}
        onValueChange={handleYearChange}
        size={"3"}
        style={sliderSlyle}
      />
    </Box>
  );
}
