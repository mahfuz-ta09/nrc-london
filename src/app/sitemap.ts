import { MetadataRoute } from "next";

async function getBlogs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOYED_API}/blog/slug`, {
      cache: "no-store",
    })

    if (!res.ok) return [];
    
    const data = await res.json()
    return data?.data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogs = await getBlogs();

    return [
        {
          url: "https://www.nrcedu-uk.com/",
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 1,
        },
        {
          url: "https://www.nrcedu-uk.com/login",
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/signup",
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/test-prep/ielts",
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/test-prep/toefl",
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/test-prep/pte",
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/test-prep/oet",
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/test-prep/duolingo",
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/test-prep/gmat",
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/test-prep/gre",
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/test-prep/sat",
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/test-prep/act",
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/test-prep/apt",
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/blogs",
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/contact",
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/about-us",
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/services",
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/proceed",
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        },
        {
          url: "https://www.nrcedu-uk.com/recruitment-partner/become-agent",
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        },
        {
          url: "https://www.nrcedu-uk.com/university",
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/subjects",
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        },
        {
          url: "https://www.nrcedu-uk.com/reset-pass",
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        },
        ...blogs.map((b: { slug: string }) => ({
          url: `https://www.nrcedu-uk.com/blogs/${b.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        })),
      ];
}
