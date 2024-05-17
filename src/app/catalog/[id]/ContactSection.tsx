"use server";

import { Flex, Text, Box } from "@radix-ui/themes";
import countryFlagEmoji from "country-flag-emoji";
import { capitalize } from "@/core/lib/textUtils";
interface Props {
  phone: string;
  city: string;
  country: string;
}

const ContactSection = ({ phone, city, country }: Props) => (
  <Flex align={"end"} justify={"end"} direction={"column"}>
    <Flex  align="end" direction={{initial:"column"}}>
      <Text weight={"bold"}>Contacto: </Text>
      <Text weight={"bold"} size={"3"}> +{phone} </Text>
    </Flex>
    <Box>
      <Text>
        {capitalize(city)}, {countryFlagEmoji.get(country)?.name} {countryFlagEmoji.get(country)?.emoji}
      </Text>
    </Box>
  </Flex>
);
export default ContactSection;
