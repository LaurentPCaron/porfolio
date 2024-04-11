import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    links: z.array(z.object({ type: z.string(), url: z.string() })),
    technologies: z.array(z.string()),
  }),
});

export const collections = {
  projects: projectsCollection,
};
