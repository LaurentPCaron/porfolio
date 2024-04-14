import { eType } from '../types/IProjectLinkIcon'
import { defineCollection, z } from 'astro:content'

const projectsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		image: z.string(),
		links: z.array(z.object({ type: z.nativeEnum(eType), url: z.string() })),
		technologies: z.array(z.string())
	})
})

export const collections = {
	projects: projectsCollection
}
