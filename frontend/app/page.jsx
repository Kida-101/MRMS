import { redirect } from "next/navigation";

export const metadata = {
  title: "RMRS",
  description: "Rent management system",
};

export default function Page() {
  redirect("/dashboard");
}
