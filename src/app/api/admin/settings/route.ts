import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const settingsSchema = z.object({
  logo: z.string().min(1, "Logo URL is required"),
  name: z.string().min(1, "Site name is required"),
  slogan: z.string().min(1, "Slogan is required"),
  workingHours: z.object({
    days: z.string().min(1, "Working days are required"),
    hours: z.string().min(1, "Working hours are required"),
  }),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone number is required"),
  socialLinks: z.record(z.string().url()),
});

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      return new NextResponse("Settings not found", { status: 404 });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("[SETTINGS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const validatedData = settingsSchema.parse(body);

    const settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      const newSettings = await prisma.siteSettings.create({
        data: {
          ...validatedData,
          workingHours: validatedData.workingHours as any,
          socialLinks: validatedData.socialLinks as any,
        },
      });
      return NextResponse.json(newSettings);
    }

    const updatedSettings = await prisma.siteSettings.update({
      where: { id: settings.id },
      data: {
        ...validatedData,
        workingHours: validatedData.workingHours as any,
        socialLinks: validatedData.socialLinks as any,
      },
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }

    console.error("[SETTINGS_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 