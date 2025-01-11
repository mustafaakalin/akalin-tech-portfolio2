import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SettingsForm from "@/components/admin/SettingsForm";
import { SiteSettings } from "@/types";

export default async function EditSettingsPage() {
  const settings = await prisma.siteSettings.findFirst();

  if (!settings) {
    notFound();
  }

  // Transform the Prisma settings data to match our SiteSettings type
  const transformedSettings: SiteSettings = {
    ...settings,
    workingHours: settings.workingHours as SiteSettings["workingHours"],
    socialLinks: settings.socialLinks as SiteSettings["socialLinks"],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Site Settings</h1>
      <SettingsForm settings={transformedSettings} />
    </div>
  );
} 