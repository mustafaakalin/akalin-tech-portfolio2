import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { Project } from "@/types";

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const project = await prisma.project.findUnique({
    where: { id: Number(params.id) },
  });

  if (!project) {
    notFound();
  }

  // Transform the Prisma project data to match our Project type
  const transformedProject: Project = {
    ...project,
    technologies: project.technologies as Project["technologies"],
    developers: project.developers as Project["developers"],
    socialLinks: project.socialLinks as Project["socialLinks"],
    images: project.images as string[],
    userUrls: project.userUrls as string[] | undefined,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Project: {project.title}</h1>
      <ProjectForm project={transformedProject} />
    </div>
  );
} 