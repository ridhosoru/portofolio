export async function GET() {

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;


    try{
    const respon = await fetch('https://api.github.com/users/ridhosoru/events',{
        headers:{
            Authorization : `token ${GITHUB_TOKEN}`,
            Accept       : 'application/vnd.github+json'
        }
    });
    const data = await respon.json();
    return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    catch(error){
        console.error('Error fetching GitHub event:', error);
        res.status(500).json({ error: 'Failed to fetch GitHub event' });
    }
    

    
}