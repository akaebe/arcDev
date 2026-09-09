import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = await auth();
  const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL;

  if (!signInUrl) {
    throw new Error("NEXT_PUBLIC_CLERK_SIGN_IN_URL is not set");
  }

  if (isAuthenticated) {
    redirect("/editor");
  }

  redirect(signInUrl);
}
