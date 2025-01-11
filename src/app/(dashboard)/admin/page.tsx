import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const projectCount = await prisma.project.count();
  const publishedProjectCount = await prisma.project.count({
    where: { isPublished: true },
  });
  const settings = await prisma.siteSettings.findFirst();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Projects</h2>
          <div className="space-y-2">
            <p>Total Projects: {projectCount}</p>
            <p>Published: {publishedProjectCount}</p>
            <p>Draft: {projectCount - publishedProjectCount}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Site Settings</h2>
          <div className="space-y-2">
            <p>Site Name: {settings?.name}</p>
            <p>Last Updated: {settings?.updatedAt.toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
          <div className="space-y-2">
            <a 
              href="/admin/projects/new" 
              className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              New Project
            </a>
            <a 
              href="/admin/settings" 
              className="block w-full text-center bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Edit Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 