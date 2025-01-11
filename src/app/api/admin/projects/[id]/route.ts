import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  purpose: z.string().min(1, "Purpose is required"),
  emoji: z.string().min(1, "Emoji is required"),
  youtubeVideoId: z.string().optional(),
  demoUrl: z.string().url().optional().or(z.literal("")),
  isPublished: z.boolean(),
  technologies: z.array(
    z.object({
      name: z.string(),
      color: z.string(),
    })
  ),
  developers: z.array(
    z.object({
      name: z.string(),
      position: z.string(),
      imageUrl: z.string(),
      socialLinks: z.record(z.string()),
    })
  ),
  socialLinks: z.record(z.string().url()),
  images: z.array(z.string()),
  userUrls: z.array(z.string().url()).optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const project = await prisma.project.findUnique({
      where: { id: Number(params.id) },
    });

    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    const project = await prisma.project.update({
      where: { id: Number(params.id) },
      data: {
        ...validatedData,
        technologies: validatedData.technologies as any,
        developers: validatedData.developers as any,
        socialLinks: validatedData.socialLinks as any,
        images: validatedData.images as any,
        userUrls: validatedData.userUrls as any,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }

    console.error("[PROJECT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.project.delete({
      where: { id: Number(params.id) },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[PROJECT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 