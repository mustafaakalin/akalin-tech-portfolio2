import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findFirst();

  if (!settings) {
    return <div>No settings found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Site Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Site Logo
                </label>
                <div className="mt-1">
                  <img
                    src={settings.logo}
                    alt="Site Logo"
                    className="h-12 w-auto"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Site Name
                </label>
                <div className="mt-1">
                  <p className="text-gray-900 dark:text-gray-100">
                    {settings.name}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Slogan
                </label>
                <div className="mt-1">
                  <p className="text-gray-900 dark:text-gray-100">
                    {settings.slogan}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Working Hours
                </label>
                <div className="mt-1">
                  <p className="text-gray-900 dark:text-gray-100">
                    {settings.workingHours.days}
                  </p>
                  <p className="text-gray-900 dark:text-gray-100">
                    {settings.workingHours.hours}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address
                </label>
                <div className="mt-1">
                  <p className="text-gray-900 dark:text-gray-100">
                    {settings.address}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <div className="mt-1">
                  <p className="text-gray-900 dark:text-gray-100">
                    {settings.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(settings.socialLinks as Record<string, string>).map(
              ([platform, url]) => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {platform}
                  </label>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm break-all"
                  >
                    {url}
                  </a>
                </div>
              )
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <a
            href="/admin/settings/edit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Edit Settings
          </a>
        </div>
      </div>
    </div>
  );
} 