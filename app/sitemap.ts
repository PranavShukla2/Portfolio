import type { MetadataRoute } from "next";
import { SITE_URL, SORTED_POSTS } from "@/lib/posts";

/** Generated at build → served at /sitemap.xml. Submit this URL in Search Console. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
    "/chess",
    "/work/arbflow",
    "/work/kleene",
    "/work/cnams",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const posts = SORTED_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00`),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...posts];
}
