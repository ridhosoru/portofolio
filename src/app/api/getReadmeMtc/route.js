export async function GET(req) {
  try {
    const readmeRes = await fetch(
      `https://raw.githubusercontent.com/ridhosoru/MaintenaceApp/main/README.md`
    );

    if (!readmeRes.ok) {
      return new Response(JSON.stringify({ error: 'README not found' }), { status: 404 });
    }

    const content = await readmeRes.text();

    return new Response(
      JSON.stringify({ repo: "MaintenaceApp", readme: content }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}