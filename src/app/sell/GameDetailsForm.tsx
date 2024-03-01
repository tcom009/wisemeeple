"use client";
import { ParsedThing } from "@/core/models/models";
import { config } from "config";
import { useWizard } from "react-use-wizard";
import {
  Card,
  Avatar,
  Flex,
  Text,
  Heading,
  Button,
  TextField,
  Box,
  Switch,
  Grid,
  TextArea,
  Select,
  Callout,
} from "@radix-ui/themes";
import Link from "next/link";
import {
  ExternalLinkIcon,
  PersonIcon,
  CalendarIcon,
  Pencil1Icon,
  StopwatchIcon,
  ArrowLeftIcon,
  PlusIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import {
  gameCondition,
  languages,
  languageDependency,
} from "@/core/data/gameDetails";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { PageStatus } from "./SellForm";
import SmallSpinner from "@/core/components/SmallSpinner";
import { useRouter } from "next/navigation";
interface GameDetailsFormProps {
  selectedGame: ParsedThing;
  isEditing?: boolean;
}

interface IFormInput {
  is_sold: boolean;
  price: number;
  condition: string;
  language_dependency: string;
  language: string;
  observations: string;
}

type StateT = {
  pageState: PageStatus;
};
export default function GameDetailsForm({
  selectedGame,
  isEditing = false,
}: GameDetailsFormProps) {
  const supabase = createClient();
  const router = useRouter()
  const getUserData = async () => {
    const { data } = await supabase.auth.getUser();
    return data;
  };
  const [state, setState] = useState<StateT>({ pageState: PageStatus.IDLE });
  const { pageState } = state;
  const setPageStatus = (value: PageStatus) => {
    setState((prevState) => ({ ...prevState, pageState: value }));
  };
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: 0,
      is_sold: false,
      condition: "",
      language_dependency: "",
      language: "",
      observations: "",
    },
  });
  const { previousStep } = useWizard();
  const {
    id,
    name,
    yearpublished,
    image,
    minplayers,
    maxplayers,
    boardgamedesigner,
    minplaytime,
    maxplaytime,
    minage,
  } = selectedGame;

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setPageStatus(PageStatus.LOADING);
    const userData = await getUserData();
    const data = {
      ...formData,
      price: +formData.price,
      bgg_id: id,
      owner_id: userData?.user?.id,
      game_name: name,
      image,
    };
    const result = await supabase.from("user_games").insert(data);
    if (result.error) {
      setPageStatus(PageStatus.ERROR);
    } else {
      router.push(`/catalog/${userData?.user?.id}`);
    }
  };
  const onChangeSwitch = (value: boolean) => {
    setValue("is_sold", value);
  };
  return (
    <>
      <Grid columns={"1"} justify={"center"} align={"center"} gap={"2"} mt="5">
        {/* Title */}
        <Flex justify="center" gap={"2"}>
          <Button variant={"outline"} onClick={() => previousStep()}>
            <ArrowLeftIcon />
          </Button>
          <Heading>Agregar a mi catálogo</Heading>
        </Flex>
        <Flex justify="center">
          <Text weight={"bold"} size="4">
            {name} - {yearpublished}
          </Text>
        </Flex>
        <Flex justify="center" direction={"row"} gap="2">
          <Avatar
            src={image}
            fallback={name[0]}
            size={{ lg: "9", xl: "9", md: "9", sm:"9", initial: "8" }}
          />
          <Flex
            direction={"column"}
            align={"start"}
            justify={"center"}
            gap={"2"}
          >
            <Flex gap={"2"} align={"center"}>
              <Pencil1Icon />
              <Text weight={"bold"}>{boardgamedesigner.join(", ")}</Text>
            </Flex>
            <Flex gap={"2"} align={"center"}>
              <StopwatchIcon />
              <Text weight={"bold"}>
                {maxplaytime === minplaytime
                  ? maxplaytime
                  : `${minplaytime} - ${maxplaytime}`}
              </Text>
            </Flex>
            <Flex gap={"2"} align={"center"}>
              <PersonIcon />
              <Text weight={"bold"}>
                {minplayers ?? ""}-{maxplayers ?? ""}
              </Text>
            </Flex>
            <Flex gap={"2"} align={"center"}>
              <CalendarIcon />
              <Text weight={"bold"}>{`+${minage}` ?? ""}</Text>
            </Flex>
            <Flex gap={"2"}>
              <Link href={`${config.BGG_GAME_URL}${id}`} target="_blank">
                <Text weight={"bold"}>Link BBG</Text>
                <ExternalLinkIcon />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Grid>
      {/* Form */}
      <Card size="2" mt="4">
        <Grid
          columns={{ xl: "2", lg: "2", md: "2", sm: "2", initial: "1" }}
          rows={{ xl: "3", lg: "3", md: "3", sm: "3", initial: "1" }}
          justify={"center"}
          gapX="4"
          gapY={"1"}
          width={"100%"}
          flow={{
            xl: "column",
            lg: "column",
            md: "column",
            sm: "row",
            initial: "row",
          }}
        >
          {isEditing && (
            <Box>
              <Flex align={"center"} height="100%" gap="2">
                <Text weight={"bold"}>Vendido</Text>
                <Switch
                  color={"cyan"}
                  onCheckedChange={onChangeSwitch}
                  size="1"
                />
              </Flex>
            </Box>
          )}
          <Box>
            <Text weight={"bold"}>Precio*</Text>
            <Controller
              name="price"
              control={control}
              rules={{
                required: { value: true, message: "Este campo es requerido" },
                min: { value: 1, message: "El valor debe ser positivo" },
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  message: "Solo se permiten caracteres numericos",
                },
              }}
              render={({ field }) => (
                <TextField.Root>
                  <TextField.Slot>
                    <Text weight={"bold"}>$</Text>
                  </TextField.Slot>
                  <TextField.Input
                    type="number"
                    height={"16"}
                    placeholder="Precio"
                    {...field}
                    required
                  />
                </TextField.Root>
              )}
            />
            <Text color="crimson" size={"1"} mt="1">
              {errors.price?.message && errors.price.message}
            </Text>
          </Box>

          <Flex direction={"column"}>
            <Text weight={"bold"}>Condicion*</Text>
            <Controller
              name="condition"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select.Root onValueChange={field.onChange}>
                  <Select.Trigger placeholder="Usado..." />
                  <Select.Content position="popper">
                    {gameCondition.map((condition) => (
                      <Select.Item
                        key={condition.value}
                        value={condition.value}
                      >
                        {condition.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              )}
            />
            <Text color="crimson" size={"1"} mt="1">
              {errors.condition && "Este campo es requerido"}
            </Text>
          </Flex>

          <Flex direction={"column"}>
            <Text weight={"bold"}>Dependencia del idioma*</Text>
            <Controller
              name="language_dependency"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select.Root onValueChange={field.onChange}>
                  <Select.Trigger placeholder="Selecciona una" />
                  <Select.Content position="popper">
                    {languageDependency.map((condition) => (
                      <Select.Item
                        key={condition.value}
                        value={condition.value}
                      >
                        {condition.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              )}
            />
            <Text color="crimson" size={"1"} mt="1">
              {errors.language_dependency && "Este campo es requerido"}
            </Text>
          </Flex>
          <Flex direction={"column"}>
            <Text weight={"bold"}>Idioma*</Text>
            <Controller
              name="language"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select.Root onValueChange={field.onChange}>
                  <Select.Trigger placeholder="Selecciona un idioma" />
                  <Select.Content position="popper">
                    {languages.map((condition) => (
                      <Select.Item
                        key={condition.value}
                        value={condition.value}
                      >
                        {condition.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              )}
            />
            <Text color="crimson" size={"1"} mt="1">
              {errors.language && "Este campo es requerido"}
            </Text>
          </Flex>
          <Box>
            <Text weight={"bold"}>Observaciones</Text>
            <Controller
              name="observations"
              control={control}
              render={({ field }) => (
                <TextArea
                  size="1"
                  {...field}
                  placeholder="Lo vendo porque..."
                />
              )}
            />
          </Box>
        </Grid>
          {pageState === PageStatus.ERROR && (
            <Callout.Root color="red" variant="soft" size="1" mt="4">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>Ha ocurrido un error</Callout.Text>
            </Callout.Root>
          )}
          {pageState === PageStatus.SUCCESS && (
            <Callout.Root color="green" variant="soft" size="1" mt="4">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>¡Agregado con exito a tu catálogo!</Callout.Text>
            </Callout.Root>
          )}
        <Grid my="3" gap="2" columns={{ xl: "2", lg: "2", md: "2", sm: "2" }}>
          <Button
            radius={"large"}
            variant={"classic"}
            color={"grass"}
            size={"2"}
            onClick={handleSubmit(onSubmit)}
            disabled={pageState === PageStatus.SUCCESS}
          >
            {pageState === PageStatus.LOADING ? (
              <SmallSpinner />
            ) : (
              <>
                <PlusIcon />
                Agregar
              </>
            )}
          </Button>

          <Button
            onClick={() => previousStep()}
            size="2"
            color="gray"
            radius="large"
            variant="classic"
          >
            <ArrowLeftIcon />
            Regresar
          </Button>
        </Grid>
      </Card>
      <Box height={"9"}></Box>
    </>
  );
}
