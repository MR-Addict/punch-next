export async function POST(request: Request) {
  try {
    const body = await request.json();
    return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" }, status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 400 });
  }
}
