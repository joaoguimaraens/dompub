export interface AuthorData {
  name: string
  slug: string
}

export interface WorkEntry {
  title: string
  slug: string
  author: string
}

export interface HeadingItem {
  depth: number
  slug: string
  text: string
}

export interface WorkModule {
  frontmatter: { title: string; type?: string }
  Content: any
  getHeadings: () => HeadingItem[]
}

const authorModules = import.meta.glob<{ frontmatter: { name: string } }>(
  '/src/data/authors/*.md', { eager: true }
)

const workModules = import.meta.glob<WorkModule>(
  '/src/data/works/**/*.md', { eager: true }
)

export function getAllAuthors(): AuthorData[] {
  return Object.entries(authorModules)
    .map(([path, mod]) => ({
      name: mod.frontmatter.name,
      slug: path.replace(/.*\//, '').replace(/\.md$/, '')
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
}

export function getAuthorBySlug(slug: string): AuthorData | undefined {
  return getAllAuthors().find(a => a.slug === slug)
}

export function getWorksByAuthor(authorSlug: string): WorkEntry[] {
  const entries: WorkEntry[] = []
  for (const [path, mod] of Object.entries(workModules)) {
    if (path.startsWith(`/src/data/works/${authorSlug}/`)) {
      const slug = path.replace(/.*\//, '').replace('.md', '')
      entries.push({ title: mod.frontmatter.title, slug, author: authorSlug })
    }
  }
  return entries
}

export function getWorkModule(author: string, work: string): WorkModule | null {
  const path = `/src/data/works/${author}/${work}.md`
  return workModules[path] ?? null
}
