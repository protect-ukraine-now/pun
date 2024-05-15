import { defineCollection } from 'astro:content'

const notes = defineCollection({
	type: 'content',
})

const pages = defineCollection({
	type: 'content',
})

export const collections = {
	notes,
	pages,
}