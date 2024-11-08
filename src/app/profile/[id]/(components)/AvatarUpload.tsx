"use client";
import { Flex, Button, Avatar } from "@radix-ui/themes";
import { createClient } from "@/utils/supabase/client";
import { useState, useCallback, useEffect, useRef } from "react";

interface Props {
  avatarPath?: string;
  userName: string;
}

interface State {
  imageUrl: string;
  imageFile: any;
}
const AvatarUpload = ({ avatarPath, userName }: Props) => {
  const [state, setState] = useState<State>({ imageUrl: "", imageFile: null });
  const { imageUrl, imageFile } = state;
  const supabase = createClient();
  const inputRef = useRef(null);
  const handleFile = (event: any) => {
    console.log();
    setState((prevState) => ({
      ...prevState,
      imageFile: event.target?.files?.[0],
      imageURL: URL.createObjectURL(event.target?.files?.[0]),
    }));
  };
  const getUserData = async () => {
    const { data } = await supabase.auth.getUser();
    return data;
  };
  const uploadFile = async () => {
    const {user} = await getUserData();
    if (imageFile && user?.id) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${user.id}/avatar.jpeg`, imageFile, {
          upsert: true,
        });
    }
  };

  const getImageUrl = useCallback(
    async (avatar: string) => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrl(avatar, 60);
        if (data?.signedUrl){
            return data?.signedUrl;
        }if (error) {
            console.log(error);
        }},
    [supabase]
  );

  useEffect(() => {
    if (avatarPath) {
        console.log(avatarPath)
      getImageUrl(avatarPath).then((url) => {
        console.log(url);
        setState((prevState) => ({
          ...prevState,
          imageUrl: url ?? prevState.imageUrl,
        }));
      });
    }
  }, [avatarPath, getImageUrl]);
  return (
    <Flex direction="column" gap="2">
      <Avatar src={imageUrl} fallback={userName[0]} size={"6"} radius="full" />
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => {
          handleFile(e);
        }}
        accept=".jpeg, .jpg, .png"
      />
      <Button onClick={uploadFile}>Subir Archivo</Button>
    </Flex>
  );
};

export default AvatarUpload;
