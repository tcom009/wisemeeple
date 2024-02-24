"use client";

import { TextField } from "@radix-ui/themes";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";

export default function EmailInput (){
    return (
        <TextField.Root>
              <TextField.Slot>
                <EnvelopeClosedIcon />
              </TextField.Slot>
              <TextField.Input
                size={"3"}
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                required
              />
            </TextField.Root>
    )
}