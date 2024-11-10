"use server";

import { Flex, Text, Box, Avatar, Separator } from "@radix-ui/themes";
import countryFlagEmoji from "country-flag-emoji";
import { capitalize } from "@/core/lib/textUtils";
import { formatPhone } from "@/core/lib/formatPhone";
import { config } from "@/config";
import WhatsappLogo from "@/core/components/WhatsappLogo";
import Link from "next/link";
interface Props {
  firstname: string
  phone: string;
  city: string;
  country: string;
  avatar: string | null;
}

const ContactSection = ({ firstname,  phone, city, country, avatar= null }: Props) => {
  const phoneFormatted = formatPhone(phone);
  return (
    <Flex align={"center"} justify={{lg:"end", xl:"end" , md :"end"}} direction={"row"} gap={"2"}>
      <Avatar src={avatar??""} fallback={firstname[0]} radius="full" size={"5"} />
      <Separator orientation="vertical" size={"4"} />
      <Flex
        justify="center"
        direction="column"
      >
        <Box>
        <Text weight={"bold"}>Contacto: </Text>
        <Link href={`${config.WHATS_APP_LINK}${phoneFormatted}`} target="_blank">
          <WhatsappLogo />
        </Link>
        </Box>
      <Box>
        <Text>
          {capitalize(city)}, {countryFlagEmoji.get(country)?.name}{" "}
          {countryFlagEmoji.get(country)?.emoji}
        </Text>
      </Box>
      </Flex>
    </Flex>
  );
};
export default ContactSection;
