"use server";

import { Flex, Text, Box } from "@radix-ui/themes";
import countryFlagEmoji from "country-flag-emoji";
import { capitalize } from "@/core/lib/textUtils";
import { formatPhone } from "@/core/lib/formatPhone";
import { config } from "@/config";
import WhatsappLogo from "./WhatsappLogo";
import Link from "next/link";
interface Props {
  phone: string;
  city: string;
  country: string;
}

const ContactSection = ({ phone, city, country }: Props) => {
  const phoneFormatted = formatPhone(phone);
  return (
    <Flex align={"end"} justify={"end"} direction={"column"}>
      <Flex
        align="center"
        justify="center"
        direction="row"
        gap={"2"}
      >
        <Text weight={"bold"}>Contacto: </Text>
        <Link href={`${config.WHATS_APP_LINK}${phoneFormatted}`} target="_blank">
          <WhatsappLogo />
        </Link>
      </Flex>
      <Box>
        <Text>
          {capitalize(city)}, {countryFlagEmoji.get(country)?.name}{" "}
          {countryFlagEmoji.get(country)?.emoji}
        </Text>
      </Box>
    </Flex>
  );
};
export default ContactSection;
