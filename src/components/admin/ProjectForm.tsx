import { Project } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";

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

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: ProjectFormData) => Promise<void>;
}

export default function ProjectForm({ project, onSubmit }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project || {
      isPublished: false,
      technologies: [{ name: "", color: "" }],
      developers: [
        {
          name: "",
          position: "",
          imageUrl: "",
          socialLinks: {},
        },
      ],
      socialLinks: {},
      images: [""],
      userUrls: [""],
    },
  });

  const handleFormSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      toast.success("Project saved successfully!");
    } catch (error) {
      toast.error("Failed to save project");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Slug
          </label>
          <input
            type="text"
            {...register("slug")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.slug && (
            <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description (Markdown)
          </label>
          <textarea
            {...register("description")}
            rows={10}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Purpose
          </label>
          <input
            type="text"
            {...register("purpose")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.purpose && (
            <p className="mt-1 text-sm text-red-600">{errors.purpose.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Emoji
          </label>
          <input
            type="text"
            {...register("emoji")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.emoji && (
            <p className="mt-1 text-sm text-red-600">{errors.emoji.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            YouTube Video ID
          </label>
          <input
            type="text"
            {...register("youtubeVideoId")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Demo URL
          </label>
          <input
            type="url"
            {...register("demoUrl")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.demoUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.demoUrl.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("isPublished")} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Published
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSubmitting ? "Saving..." : "Save Project"}
        </button>
      </div>
    </form>
  );
} 