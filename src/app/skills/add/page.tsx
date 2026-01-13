import { redirect } from "next/navigation";

export default function SkillsAddRedirectPage() {
  redirect("/admin/skills/add");
}
