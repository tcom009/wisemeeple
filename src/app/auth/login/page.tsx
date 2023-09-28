import LoginForm from "./LoginForm"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import  { cookies } from "next/headers"
export default function LoginPage(){
    const supabase = createServerComponentClient({ cookies })
    
    return <div><LoginForm/></div>
}