import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation" 
export default async function UnauthenticatedPage() {
  const supabase = createServerComponentClient({ cookies })
  const {data: {session }} = await supabase.auth.getSession()
  

  if (session){
    redirect('/sell')
  }
  return (
    <div>Please, login to see this page</div>
  )
}
