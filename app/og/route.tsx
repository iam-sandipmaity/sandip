import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // ?title=<title>
        const hasTitle = searchParams.has('title');
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100)
            : 'Sandip Maity Portfolio';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#19191e',
                        backgroundImage: 'radial-gradient(circle at 25px 25px, #2d2d32 2%, transparent 0%), radial-gradient(circle at 75px 75px, #2d2d32 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#19191e',
                            padding: '40px 80px',
                            border: '1px solid #5eead4',
                            borderRadius: '20px',
                            boxShadow: '0 0 50px -12px rgba(94, 234, 212, 0.25)',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 60,
                                fontStyle: 'normal',
                                color: '#cfd6cf',
                                marginTop: 30,
                                lineHeight: 1.2,
                                whiteSpace: 'pre-wrap',
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                fontWeight: 'bold',
                            }}
                        >
                            {title}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 30,
                                fontStyle: 'normal',
                                color: '#5eead4',
                                marginTop: 30,
                                fontFamily: 'monospace',
                            }}
                        >
                            sandipmaity.vercel.app
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
