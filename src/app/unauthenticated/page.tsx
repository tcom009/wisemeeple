
import { cookies } from "next/headers"
import { redirect } from "next/navigation" 


export default async function UnauthenticatedPage() {

  return (
    <div>Please, login to see this page</div>
  )
}
