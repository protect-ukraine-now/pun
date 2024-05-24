import { defineCollection } from 'astro:content'

const pages = defineCollection({
	type: 'content',
})

const notes = defineCollection({
	type: 'content',
})

const blog = defineCollection({
	type: 'content',
})

export const collections = {
	pages,
	notes,
	blog,
}