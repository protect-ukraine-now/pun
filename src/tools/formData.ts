export async function extractFormData(request: Request) {
	if (request.method !== 'POST') return
	const form = await request.formData()
	const data = {}
	for(const [key, val] of form.entries()) {
		data[key] = val
	}
	return data
}