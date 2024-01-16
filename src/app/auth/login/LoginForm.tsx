"use client";
import { Button } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
export default function LoginForm() {
    const router = useRouter();
    const supabase = createClientComponentClient()

    // const handleSignUp = async () => {
    //     await supabase.auth.signUp({
    //         email: "g.mayerduran@gmail.com",
    //         password: "sup3rs3cur3",
    //         options: {
    //           emailRedirectTo: `${location.origin}/auth/callback`,
    //         },
    //       });
    //       router.refresh();
    // }

    const handleLogin = async () => {
        await supabase.auth.signInWithPassword({
            email: "g.mayerduran@gmail.com",
            password: "sup3rs3cur3",
          });
          router.refresh();
    }

    const handleLogOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }

    return (
    <div>
        <Button onClick={handleLogin}>Login</Button>
        {/* <Button onClick={handleSignUp}>Sign Up</Button> */}
        <Button onClick={handleLogOut}>Log Out</Button>
    </div>
  )
}
