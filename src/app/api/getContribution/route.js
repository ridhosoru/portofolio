import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  const query = `
    query {
      user(login: "ridhosoru") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();

    const days = json.data.user.contributionsCollection.contributionCalendar.weeks
      .flatMap((week) => week.contributionDays);

    return NextResponse.json(days);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 });
  }
}