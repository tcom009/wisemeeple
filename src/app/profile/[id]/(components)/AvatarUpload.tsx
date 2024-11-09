"use client";
import { Flex, Avatar, Callout, Spinner, Button  } from "@radix-ui/themes";
import { ExclamationTriangleIcon, TrashIcon } from "@radix-ui/react-icons";
import { createClient } from "@/utils/supabase/client";
import { useState, useCallback, useEffect, useRef } from "react";
import CameraIcon from "./CameraIcon";
import { PageStatus } from "@/core/models/models";

interface Props {
  avatarPath?: string;
  userName: string;
}

interface State {
  imageUrl: string;
  pageStatus: PageStatus;
}
const initialState: State = {
  imageUrl: "",
  pageStatus: PageStatus.IDLE,
};

const AvatarUpload = ({ avatarPath, userName }: Props) => {
  const [state, setState] = useState<State>(initialState);
  const { imageUrl, pageStatus } = state;
  const supabase = createClient();
  const inputRef = useRef(null);

  const getUserData = async () => {
    const { data } = await supabase.auth.getUser();
    return data;
  };
  const uploadFile = async (file: any) => {
    const { user } = await getUserData();
    if (user?.id) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${user.id}/avatar.jpeg`, file, {
          upsert: true,
        });
      return { uploadData: data, uploadError: error };
    }
    return { uploadData: null, uploadError: null };
  };

  const getImageUrl = useCallback(
    async (avatar: string): Promise<string | null> => {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .createSignedUrl(avatar, 60);

        if (error) {
          console.error("Error al generar URL firmada:", error);
          return null;
        }

        return data?.signedUrl ?? null;
      } catch (error) {
        console.error("Error en getImageUrl:", error);
        return null;
      }
    },
    [supabase]
  );

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (!file) {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      pageStatus: PageStatus.LOADING,
    }));

    try {
      const { uploadData, uploadError } = await uploadFile(file);
      if (uploadError) {
        console.log(uploadError);
        setState((prevState) => ({
          ...prevState,
          pageStatus: PageStatus.ERROR,
        }));
      }
      if (uploadData) {
        const { path } = uploadData;
        const url = await getImageUrl(path);
        setState((prevState) => ({
          ...prevState,
          imageUrl: url ?? prevState.imageUrl,
          pageStatus: PageStatus.IDLE,
        }));
      }
    } catch (error) {
      console.log(error);
      setState((prevState) => ({
        ...prevState,
        pageStatus: PageStatus.ERROR,
      }));
    }
  };
  const deleteAvatar = async () => {
    const { user } = await getUserData();
    if (user?.id) {
      setState((prevState) => ({
        ...prevState,
        pageStatus: PageStatus.LOADING,
      }))
      const { data, error } = await supabase.storage
        .from("avatars")
        .remove([`${user.id}/avatar.jpeg`]);
        setState((prevState) => ({
          ...prevState,
          imageUrl: "",
          pageStatus: PageStatus.IDLE,
        }))
      return { deleteData: data, deleteError: error };
    }
    return { deleteData: null, deleteError: null };
  };

  useEffect(() => {
    if (avatarPath) {
      setState((prevState) => ({
        ...prevState,
        pageStatus: PageStatus.LOADING,
      }));
      getImageUrl(avatarPath).then((url) => {
        setState((prevState) => ({
          ...prevState,
          imageUrl: url ?? prevState.imageUrl,
          pageStatus: PageStatus.IDLE,
        }));
      });
    }
  }, [avatarPath, getImageUrl]);

  if (pageStatus === PageStatus.LOADING) {
    return (
      <Flex direction="column" gap="2">
        <div className="image-upload">
          <Spinner />
        </div>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="2">
      {!imageUrl ? (
        <div className="image-upload clickable">
          <CameraIcon height="1.5em" width="1.5em" fill={"#BAA7FF"} />
          <input
            type="file"
            ref={inputRef}
            onChange={(e) => {
              handleFile(e);
            }}
            className="file-input"
            accept=".jpeg, .jpg, .png, .pdf"
          />
        </div>
      ) : (
        <Flex gap="2" align="center">
        <div className="image-upload clickable">
          <Avatar
            src={imageUrl}
            fallback={userName[0]}
            size={"6"}
            radius="full"
            />
          <input
            type="file"
            ref={inputRef}
            onChange={(e) => {
              handleFile(e);
            }}
            className="file-input"
            accept=".jpeg, .jpg, .png"
          />
        </div>
          <Button
            title="Eliminar imagen"
            color="red"
            size={{ xs: "1", initial: "1" }}
            my="1"
            onClick={deleteAvatar}
         
            >
            <TrashIcon />
          </Button>
            </Flex>
      )}
      {pageStatus === PageStatus.ERROR && (
        <Callout.Root color="red" role="alert">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>Error al subir la imagen.</Callout.Text>
        </Callout.Root>
      )}
    </Flex>
  );
};

export default AvatarUpload;
