"use client";
import {
  Card,
  Text,
  Button,
  TextField,
  Box,
  Grid,
  Callout,
  Container,
  Select,
  Flex,
} from "@radix-ui/themes";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { PageStatus } from "@/core/models/models";
import SmallSpinner from "@/core/components/SmallSpinner";
import { formatPhone } from "@/core/lib/formatPhone";
import { ProfileI } from "@/core/models/models";
import { createProfileAndCatalog } from "./actions";
import { countries } from "core/data/countries";

interface ProfileFormProps {
  profile?: ProfileI;
  isEditing?: boolean;
}

interface IFormInput {
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  country: string;
}

type StateT = {
  pageState: PageStatus;
};
export default function ProfileForm({
  isEditing = false,
  profile,
}: ProfileFormProps) {
  const supabase = createClient();
  const getUserData = async () => {
    const { data } = await supabase.auth.getUser();
    return data;
  };
  const [state, setState] = useState<StateT>({ pageState: PageStatus.IDLE });
  const { pageState } = state;
  const getCountry = (countryCode: string): string => {
    const country = countries.find((country) => country.value === countryCode);
    return `${country?.flag} ${country?.label}`;
  };
  const setPageStatus = (value: PageStatus) => {
    setState((prevState) => ({ ...prevState, pageState: value }));
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: profile?.first_name ?? "",
      last_name: profile?.last_name ?? "",
      phone: profile?.phone ?? "",
      city: profile?.city ?? "",
      country: profile?.country ?? "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setPageStatus(PageStatus.LOADING);
    const userData = await getUserData();

    const data = {
      ...formData,
      country: formData.country.toLocaleUpperCase(),
      city: formData.city.toLocaleUpperCase(),
      phone: formatPhone(formData.phone),
    };

    if (isEditing) {
      const result = await supabase
        .from("profiles")
        .update(data)
        .eq("profile_id", userData?.user?.id);
      if (result.error) {
        setPageStatus(PageStatus.ERROR);
      } else {
        setPageStatus(PageStatus.SUCCESS);
      }
    }
    if (!isEditing && userData?.user?.id !== undefined) {
      await createProfileAndCatalog({
        ...data,
        profile_id: userData?.user?.id,
      });
    }
  };

  return (
    <>
      <Container size={{ lg: "3", md: "3", sm: "2", initial: "1" }}>
        {/* Form */}
        <Card size="2" mt="4">
          <Text size={"5"} weight={"bold"}>
            Mis Datos
          </Text>
          <Grid
            mt={"4"}
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
              <Text weight={"bold"}>Nombre*</Text>
              <Controller
                name="first_name"
                control={control}
                rules={{
                  required: { value: true, message: "Este campo es requerido" },
                }}
                render={({ field }) => (
                  <TextField.Root
                    type="text"
                    placeholder="Nombre"
                    {...field}
                    required
                  ></TextField.Root>
                )}
              />
              <Text color="crimson" size={"1"} mt="1">
                {errors.first_name?.message && errors.first_name.message}
              </Text>
            </Box>

            <Box>
              <Text weight={"bold"}>Apellido*</Text>
              <Controller
                name="last_name"
                control={control}
                rules={{
                  required: { value: true, message: "Este campo es requerido" },
                }}
                render={({ field }) => (
                  <TextField.Root
                    type="text"
                    placeholder="Apellido"
                    {...field}
                    required
                  ></TextField.Root>
                )}
              />
              <Text color="crimson" size={"1"} mt="1">
                {errors.last_name?.message && errors.last_name.message}
              </Text>
            </Box>

            <Box>
              <Text weight={"bold"}>Telefono*</Text>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: { value: true, message: "Este campo es requerido" },
                }}
                render={({ field }) => (
                  <TextField.Root
                    type="text"
                    placeholder="Nombre"
                    {...field}
                    required
                  ></TextField.Root>
                )}
              />
              <Text color="crimson" size={"1"} mt="1">
                {errors.phone?.message && errors.phone.message}
              </Text>
            </Box>

            <Box>
              <Text weight={"bold"}>Ciudad*</Text>
              <Controller
                name="city"
                control={control}
                rules={{
                  required: { value: true, message: "Este campo es requerido" },
                }}
                render={({ field }) => (
                  <TextField.Root
                    type="text"
                    placeholder="Ciudad"
                    {...field}
                    required
                  ></TextField.Root>
                )}
              />
              <Text color="crimson" size={"1"} mt="1">
                {errors.city?.message && errors.city.message}
              </Text>
            </Box>
            <Box>
              <Text weight={"bold"}>Pais* </Text>
              <Text size={"2"}>
                {profile?.country && `Actual: ${getCountry(profile?.country)}`}
              </Text>
              <Flex direction={"column"} width={"100%"}>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select.Root
                      defaultValue={
                        profile?.country && getCountry(profile?.country)
                      }
                      onValueChange={field.onChange}
                    >
                      <Select.Trigger />
                      <Select.Content position="popper">
                        {countries.map((country) => (
                          <Select.Item
                            key={country.value}
                            value={country.value}
                          >
                            {`${country.flag} ${country.label}`}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  )}
                />
              </Flex>
              <Text color="crimson" size={"1"} mt="1">
                {errors.country?.message && errors.country.message}
              </Text>
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
              <Callout.Text>¡Guardado!</Callout.Text>
            </Callout.Root>
          )}
          <Grid my="3" gap="2">
            <Button
              radius={"large"}
              variant={"classic"}
              color={"grass"}
              size={"2"}
              onClick={handleSubmit(onSubmit)}
            >
              {pageState === PageStatus.LOADING ? (
                <SmallSpinner />
              ) : (
                <>Guardar</>
              )}
            </Button>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
