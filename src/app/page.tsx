import { Box, Flex, Container, Grid } from "@radix-ui/themes";
import { Button, Card, TextArea } from "@radix-ui/themes";
export default function Home() {
  return (
    <div  className="div-bg div-full-center">
      <Card variant="surface">
           <Flex gap="3" direction={"column"}>
             <h1> Hello!, give me a description and I&apos;m gonna give you some games</h1>
             <TextArea size={"3"} placeholder="I want a game that... " />
             <Button size={"2"} mt="3" mb="5">Submit</Button>
           </Flex>
         </Card>
    </div>
    
  );
}
