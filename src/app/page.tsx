import { Box, Flex, Container, Grid } from "@radix-ui/themes";
import { Button, Card, TextFieldInput } from "@radix-ui/themes";


const LayoutStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
}

export default function Home() {
  return (
    <div style={LayoutStyle} className="div-bg">
      <Card variant="surface">
           <Flex gap="3" direction={"column"}>
             <h1> Hello!, What&apos;s your BoardGameGeek user?</h1>
             <TextFieldInput size={"3"} placeholder="Bgguser..." />
             <Button size={"2"} mt="3" mb="5">Submit</Button>
           </Flex>
         </Card>
    </div>
    
  );
}
