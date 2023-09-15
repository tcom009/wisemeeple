import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Text, Badge } from "@radix-ui/themes";

import React from "react";

export default function GitHubBadge() {
  return (
    <Link href={"https://github.com/tcom009"} target="_blank">
      <Badge color="green" className="clickable">
        <Text weight={"bold"}>Made with ❤️ by tcom009</Text>
        <GitHubLogoIcon />
      </Badge>
    </Link>
  );
}
