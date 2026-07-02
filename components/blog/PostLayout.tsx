import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/Section";
import {
  POSTS_BY_SLUG,
  POST_ACCENTS,
  SORTED_POSTS,
  formatPostDate,
} from "@/lib/posts";

/**
 * Shared shell for every blog post. A post page is just:
 *
 *   export const metadata = postMetadata("my-slug");
 *   export default function Post() {
 *     return (
 *       <PostLayout slug="my-slug">
 *         <p>…</p>
 *         <h2>…</h2>
 *       </PostLayout>
 *     );
 *   }
 *
 * Body typography (h2/h3, p, lists, code, blockquote…) is styled by the
 * `.prose-blog` rules in globals.css.
 */
export default function PostLayout({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const post = POSTS_BY_SLUG[slug];
  if (!post) notFound();

  const index = SORTED_POSTS.findIndex((p) => p.slug === slug);
  const accent = POST_ACCENTS[Math.max(index, 0) % POST_ACCENTS.length];

  return (
    <article className="relative mx-auto w-full max-w-page px-6 py-16 sm:px-8 sm:py-24">
      {/* vibrant header backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden"
      >
        <div className="absolute -left-24 -top-20 h-80 w-80 rounded-full bg-accent-wash blur-3xl" />
        <div className="absolute right-0 -top-10 h-72 w-72 rounded-full bg-accent-2-wash blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(132,94,194,0.12) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>

      <Link
        href="/blog"
        className="font-mono text-[13px] text-ink-2 transition-colors hover:text-accent"
      >
        ← All posts
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Eyebrow>Blog</Eyebrow>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span className="mx-2" aria-hidden>
              ·
            </span>
            {post.readingTime} read
          </p>
        </div>

        <h1 className="mt-5 max-w-3xl text-[36px] font-semibold leading-[1.08] tracking-tightest sm:text-[48px]">
          <span className="text-candy">{post.title}</span>
        </h1>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 font-mono text-[12px] font-medium"
              style={{ background: accent.wash, color: accent.color }}
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose-blog mt-12">{children}</div>

      <footer className="mt-16 border-t border-line pt-10">
        <p className="text-[16px] leading-relaxed text-ink-2">
          Thoughts, corrections, or want to talk about this? I read everything.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="mailto:pranavmshukla@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-candy px-5 py-3 font-mono text-[13px] text-white shadow-md shadow-accent/20 transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
          >
            Email me
          </a>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-3 font-mono text-[13px] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            More posts
          </Link>
        </div>
      </footer>
    </article>
  );
}
