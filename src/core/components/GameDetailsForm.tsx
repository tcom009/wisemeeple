"use client";
import {
  Card,
  Flex,
  Text,
  Button,
  TextField,
  Box,
  Switch,
  Grid,
  TextArea,
  Select,
  Callout,
} from "@radix-ui/themes";
import {
  ArrowLeftIcon,
  PlusIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import {
  gameCondition,
  languages,
  languageDependency,
} from "@/core/data/gameDetails";
import { ParsedThing } from "@/core/models/models";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { PageStatus } from "@/core/models/models";
import SmallSpinner from "@/core/components/SmallSpinner";
import { useRouter } from "next/navigation";

interface IFormInput {
  accepts_changes: boolean;
  is_sold: boolean;
  price: number;
  condition: string;
  language_dependency: string;
  language: string;
  observations: string;
}
interface GameDetailsFormProps {
  isEditing?: boolean;
  formDefaultValues?: IFormInput;
  gameId?: string;
  gameDefaultValues?: ParsedThing;
  onClickBack?: () => void;
}

type StateT = {
  pageState: PageStatus;
};
export default function GameDetailsForm({
  isEditing = false,
  formDefaultValues,
  gameDefaultValues,
  gameId,
  onClickBack,
}: GameDetailsFormProps) {
  const supabase = createClient();
  const router = useRouter();
  const getUserData = async () => {
    const { data } = await supabase.auth.getUser();
    return data;
  };
  const getCatalogId = async () => {
    const user = await getUserData();
    const { data } = await supabase
      .from("catalog")
      .select()
      .eq("user", user?.user?.id)
      .single();
    return data?.id;
  };
  const [state, setState] = useState<StateT>({ pageState: PageStatus.IDLE });
  const { pageState } = state;
  const setPageStatus = (value: PageStatus) => {
    setState((prevState) => ({ ...prevState, pageState: value }));
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: formDefaultValues?.price ?? 0,
      is_sold: formDefaultValues?.is_sold ?? false,
      condition: formDefaultValues?.condition ?? "",
      language_dependency: formDefaultValues?.language_dependency ?? "",
      language: formDefaultValues?.language ?? "",
      observations: formDefaultValues?.observations ?? "",
      accepts_changes: formDefaultValues?.accepts_changes ?? false,
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setPageStatus(PageStatus.LOADING);
    const userData = await getUserData();
    const catalogId = await getCatalogId();
    const data = {
      ...formData,
      price: +formData.price,
      bgg_id: gameDefaultValues?.id,
      owner_id: userData?.user?.id,
      game_name: gameDefaultValues?.name,
      image: gameDefaultValues?.image,
      catalog_id: catalogId,
    };
    const editGameData = {
      ...formData,
      price: +formData.price,
    };
    const result = isEditing
          ? await supabase.from("user_games").update(editGameData).eq("id", gameId)
          : await supabase.from("user_games").insert(data);
    if (result.error) {
      setPageStatus(PageStatus.ERROR);
    } else {
      router.push(`/catalog/${catalogId}`);
      router.refresh();
    }
  };
  return (
    <>
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
                <TextField.Root placeholder="Precio">
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
                <Select.Root
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                <Select.Root
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                <Select.Root
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          <Flex direction={"column"} gap={"2"}>
            {isEditing && (
              <Box>
                <Flex align={"center"} gap="2">
                  <Text weight={"bold"}>
                    <Controller
                      name="is_sold"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Switch
                            color={"cyan"}
                            size="1"
                            onCheckedChange={field.onChange}
                            defaultChecked={field.value}
                          />{" "}
                          Lo he vendido
                        </>
                      )}
                    />
                  </Text>
                </Flex>
              </Box>
            )}
            <Box>
              <Flex align={"center"} gap="2">
                <Text weight={"bold"}>
                  <Controller
                    name="accepts_changes"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Switch
                          color={"cyan"}
                          size="1"
                          onCheckedChange={field.onChange}
                          defaultChecked={field.value}
                        />{" "}
                        Acepta Cambios
                      </>
                    )}
                  />
                </Text>
              </Flex>
            </Box>
          </Flex>
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
            <Callout.Text>{isEditing ? "Editado con exito" : "¡Agregado con exito a tu catálogo!"}</Callout.Text>
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
          {!isEditing && (
            <Button
              onClick={() => onClickBack && onClickBack()}
              size="2"
              color="gray"
              radius="large"
              variant="classic"
            >
              <ArrowLeftIcon />
              Regresar
            </Button>
          )}
        </Grid>
      </Card>
      <Box height={"9"}></Box>
    </>
  );
}
