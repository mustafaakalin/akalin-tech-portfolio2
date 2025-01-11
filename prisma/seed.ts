import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // İzinli kullanıcıları ekle
  await prisma.allowedUser.createMany({
    data: [
      { email: 'mustafa0xall@gmail.com' },
      { email: 'aslanahmet2424@gmail.com' },
    ],
    skipDuplicates: true,
  });

  // Site ayarlarını ekle
  await prisma.siteSettings.create({
    data: {
      logo: '/images/logo.png',
      name: 'AKALIN TECH',
      slogan: 'Innovative Technology Solutions for Tomorrow',
      workingHours: {
        days: 'Monday - Friday',
        hours: '9:00 AM - 6:00 PM',
      },
      address: 'Istanbul, Turkey',
      phone: '+90 (555) 123 4567',
      socialLinks: {
        instagram: 'https://instagram.com/akalintech',
        facebook: 'https://facebook.com/akalintech',
        twitter: 'https://twitter.com/akalintech',
        tiktok: 'https://tiktok.com/@akalintech',
        telegram: 'https://t.me/akalintech',
        whatsapp: 'https://wa.me/905551234567',
        reddit: 'https://reddit.com/r/akalintech',
        github: 'https://github.com/akalintech',
        linkedin: 'https://linkedin.com/company/akalintech',
        youtube: 'https://youtube.com/@akalintech',
        medium: 'https://akalintech.medium.com',
        vk: 'https://vk.com/akalintech',
      },
    },
  });

  // Örnek projeleri ekle
  await prisma.project.createMany({
    data: [
      {
        title: 'AI-Powered Analytics Platform',
        slug: 'ai-powered-analytics-platform',
        description: '# AI-Powered Analytics Platform\n\nA sophisticated analytics platform leveraging machine learning algorithms to provide actionable insights from complex data sets.\n\n## Features\n\n- Real-time data processing\n- Machine learning models\n- Interactive dashboards\n- Automated reporting\n\n## Technology Stack\n\n- Python for backend processing\n- TensorFlow for ML models\n- React for frontend\n- AWS for infrastructure',
        purpose: 'Revolutionizing data analytics with artificial intelligence',
        images: [
          '/projects/analytics/main.jpg',
          '/projects/analytics/dashboard.jpg',
          '/projects/analytics/reports.jpg',
        ],
        youtubeVideoId: 'dQw4w9WgXcQ',
        technologies: [
          { name: 'Python', color: 'bg-blue-500/20 text-blue-300' },
          { name: 'TensorFlow', color: 'bg-orange-500/20 text-orange-300' },
          { name: 'React', color: 'bg-cyan-500/20 text-cyan-300' },
          { name: 'AWS', color: 'bg-yellow-500/20 text-yellow-300' },
        ],
        developers: [
          {
            name: 'John Doe',
            position: 'Lead Developer',
            imageUrl: '/team/john.jpg',
            socialLinks: {
              github: 'https://github.com/johndoe',
              linkedin: 'https://linkedin.com/in/johndoe',
              twitter: 'https://twitter.com/johndoe',
            },
          },
          {
            name: 'Jane Smith',
            position: 'ML Engineer',
            imageUrl: '/team/jane.jpg',
            socialLinks: {
              github: 'https://github.com/janesmith',
              linkedin: 'https://linkedin.com/in/janesmith',
            },
          },
        ],
        socialLinks: {
          github: 'https://github.com/akalintech/ai-analytics',
          linkedin: 'https://linkedin.com/company/akalintech',
        },
        viewCount: 1234,
        isPublished: true,
        emoji: '🤖',
        demoUrl: 'https://analytics.akalin.tech',
        userUrls: [
          'https://user1.analytics.akalin.tech',
          'https://user2.analytics.akalin.tech',
        ],
      },
      {
        title: 'Secure Communication System',
        slug: 'secure-communication-system',
        description: '# Secure Communication System\n\nEnd-to-end encrypted communication system with advanced security features and real-time messaging capabilities.\n\n## Features\n\n- End-to-end encryption\n- Real-time messaging\n- File sharing\n- Video calls\n\n## Technology Stack\n\n- Go for backend\n- WebRTC for real-time communication\n- TypeScript for frontend\n- Docker for deployment',
        purpose: 'Enabling secure and private communication for teams',
        images: [
          '/projects/comms/main.jpg',
          '/projects/comms/chat.jpg',
          '/projects/comms/video.jpg',
        ],
        youtubeVideoId: 'dQw4w9WgXcQ',
        technologies: [
          { name: 'Go', color: 'bg-blue-500/20 text-blue-300' },
          { name: 'WebRTC', color: 'bg-green-500/20 text-green-300' },
          { name: 'TypeScript', color: 'bg-blue-400/20 text-blue-200' },
          { name: 'Docker', color: 'bg-blue-600/20 text-blue-400' },
        ],
        developers: [
          {
            name: 'Alice Johnson',
            position: 'Security Expert',
            imageUrl: '/team/alice.jpg',
            socialLinks: {
              github: 'https://github.com/alicejohnson',
              linkedin: 'https://linkedin.com/in/alicejohnson',
            },
          },
        ],
        socialLinks: {
          github: 'https://github.com/akalintech/secure-comms',
        },
        viewCount: 987,
        isPublished: true,
        emoji: '🔒',
        demoUrl: 'https://comms.akalin.tech',
        userUrls: ['https://team.comms.akalin.tech'],
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 