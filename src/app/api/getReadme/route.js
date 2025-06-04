export async function GET(req) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const { searchParams } = new URL(req.url);
  const index = parseInt(searchParams.get("index"));

  if (isNaN(index)) {
    return new Response(JSON.stringify({ error: 'Index is invalid' }), { status: 400 });
  }

  try {
    const repoRes = await fetch('https://api.github.com/user/repos', {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });

    const repos = await repoRes.json();

    if (index < 0 || index >= repos.length) {
      return new Response(JSON.stringify({ error: 'Index out of range' }), { status: 404 });
    }

    const selectedRepo = repos[index];

    const readmeRes = await fetch(
      `https://api.github.com/repos/${selectedRepo.owner.login}/${selectedRepo.name}/readme`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );

    if (!readmeRes.ok) {
      return new Response(JSON.stringify({ error: 'README not found' }), { status: 404 });
    }

    const readmeData = await readmeRes.json();
    const content = Buffer.from(readmeData.content, 'base64').toString('utf-8');

    return new Response(JSON.stringify({ repo: selectedRepo.name, readme: content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}