export default {
	async fetch(request): Promise<Response> {
		const base = 'https://www.fromthehart.tech';
		const statusCode = 301;

		const url = new URL(request.url);
		const { pathname, search } = url;

		const destinationURL = `${base}${pathname}${search}`;
		console.log(destinationURL);

		return Response.redirect(destinationURL, statusCode);
	},
} satisfies ExportedHandler;
