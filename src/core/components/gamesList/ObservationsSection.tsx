"use client";
import { Flex, Text, Link} from "@radix-ui/themes";
import { useState } from "react";
import { trimText } from "@/core/lib/textUtils";
const Observations = ({ observations }: { observations: string }) => {
    const [truncate, setTruncate] = useState(true);
    if (observations.length) {
      return (
        <Flex>
          <Text size={"2"} weight={"bold"}>
            Observaciones:{" "}
            <Text weight={"light"} size={"2"} trim="normal">
              {truncate ? trimText(observations, 40) : observations}
            </Text>
            {observations.length > 40 && (
              <Link onClick={() => setTruncate(!truncate)} size={"1"}>
                {truncate ? "Mostrar más" : "Mostrar Menos"}
              </Link>
            )}
          </Text>
        </Flex>
      );
    }
    return null;
  };

  export default Observations;