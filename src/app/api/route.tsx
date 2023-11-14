export async function GET(request: Request) {
    return new Response(JSON.stringify({ secret: "The cake is a lie" }))
}