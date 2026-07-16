import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Query parameters parsing
        const title = searchParams.get('title') || 'Sandip Maity Portfolio';
        const description = searchParams.get('description') || '';
        const date = searchParams.get('date') || '';
        const tags = searchParams.get('tags') || '';
        const readingTime = searchParams.get('readingTime') || '';
        const type = searchParams.get('type') || 'home';

        // Parse comma-separated tags
        const parsedTags = tags ? tags.split(',').filter(Boolean) : [];

        // Select category label based on type
        let categoryLabel = '// ROOT_DIRECTORY';
        if (type === 'blog') {
            categoryLabel = '// TECHNICAL_WRITING';
        } else if (type === 'project') {
            categoryLabel = '// HARDWARE_PROJECT';
        } else if (type === 'tag') {
            categoryLabel = '// INDEX_FILTER';
        } else if (type === 'page') {
            categoryLabel = '// SYSTEM_SPEC';
        }

        // Fetch custom brand font from local public directory
        let departureMonoFont: ArrayBuffer | null = null;
        try {
            const fontUrl = new URL('/DepartureMono-Regular.otf', request.url);
            const res = await fetch(fontUrl);
            if (res.ok) {
                departureMonoFont = await res.arrayBuffer();
            }
        } catch (e) {
            console.error('Failed to load Departure Mono font', e);
        }

        const fontsOption: any[] = [];
        if (departureMonoFont) {
            fontsOption.push({
                name: 'Departure Mono',
                data: departureMonoFont,
                style: 'normal',
            });
        }

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        backgroundColor: '#07080b',
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(43, 207, 144, 0.12) 1px, transparent 0)',
                        backgroundSize: '32px 32px',
                        padding: '54px 64px',
                        color: '#e2e8f0',
                        overflow: 'hidden',
                    }}
                >
                    {/* Inner tech border */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 24,
                            left: 24,
                            right: 24,
                            bottom: 24,
                            border: '1px solid rgba(43, 207, 144, 0.18)',
                            borderRadius: '12px',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Corner Tech Brackets */}
                    <div style={{ position: 'absolute', top: 22, left: 22, width: 24, height: 24, borderLeft: '3px solid #2bcf90', borderTop: '3px solid #2bcf90', borderTopLeftRadius: '6px' }} />
                    <div style={{ position: 'absolute', top: 22, right: 22, width: 24, height: 24, borderRight: '3px solid #2bcf90', borderTop: '3px solid #2bcf90', borderTopRightRadius: '6px' }} />
                    <div style={{ position: 'absolute', bottom: 22, left: 22, width: 24, height: 24, borderLeft: '3px solid #2bcf90', borderBottom: '3px solid #2bcf90', borderBottomLeftRadius: '6px' }} />
                    <div style={{ position: 'absolute', bottom: 22, right: 22, width: 24, height: 24, borderRight: '3px solid #2bcf90', borderBottom: '3px solid #2bcf90', borderBottomRightRadius: '6px' }} />

                    {/* Decorative Circuit Board SVG Icon */}
                    <svg
                        width="160"
                        height="160"
                        viewBox="0 0 100 100"
                        style={{
                            position: 'absolute',
                            right: 60,
                            top: 140,
                            opacity: 0.14,
                        }}
                    >
                        <rect x="25" y="25" width="50" height="50" rx="6" stroke="#2bcf90" strokeWidth="2" fill="none" />
                        <circle cx="50" cy="50" r="10" stroke="#2bcf90" strokeWidth="1.5" fill="none" />
                        {/* Chip pins */}
                        <line x1="15" y1="35" x2="25" y2="35" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="15" y1="45" x2="25" y2="45" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="15" y1="55" x2="25" y2="55" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="15" y1="65" x2="25" y2="65" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="75" y1="35" x2="85" y2="35" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="75" y1="45" x2="85" y2="45" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="75" y1="55" x2="85" y2="55" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="75" y1="65" x2="85" y2="65" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="35" y1="15" x2="35" y2="25" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="45" y1="15" x2="45" y2="25" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="55" y1="15" x2="55" y2="25" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="65" y1="15" x2="65" y2="25" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="35" y1="75" x2="35" y2="85" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="45" y1="75" x2="45" y2="85" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="55" y1="75" x2="55" y2="85" stroke="#2bcf90" strokeWidth="1.5" />
                        <line x1="65" y1="75" x2="65" y2="85" stroke="#2bcf90" strokeWidth="1.5" />
                        {/* Status LED */}
                        <circle cx="33" cy="33" r="2.5" fill="#2bcf90" />
                    </svg>

                    {/* Top Bar (Header) */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            marginBottom: 'auto',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: 'Departure Mono',
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    color: '#2bcf90',
                                    letterSpacing: '1px',
                                }}
                            >
                                [SANDIP.MAITY]
                            </span>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(43, 207, 144, 0.08)',
                                    border: '1px solid rgba(43, 207, 144, 0.25)',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    gap: 6,
                                }}
                            >
                                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2bcf90' }} />
                                <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#2bcf90', fontWeight: 'bold' }}>SYSTEM_ACTIVE</span>
                            </div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                fontFamily: 'Departure Mono',
                                fontSize: 15,
                                color: '#a7f3d0',
                                backgroundColor: 'rgba(167, 243, 208, 0.05)',
                                border: '1px solid rgba(167, 243, 208, 0.15)',
                                padding: '6px 12px',
                                borderRadius: '6px',
                            }}
                        >
                            {categoryLabel}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            width: '100%',
                            marginTop: 36,
                            marginBottom: 'auto',
                            gap: 16,
                            maxWidth: '860px',
                        }}
                    >
                        {/* Dynamic Title */}
                        <div
                            style={{
                                display: 'flex',
                                fontFamily: 'Departure Mono',
                                fontSize: title.length > 50 ? 46 : 56,
                                fontWeight: 'bold',
                                color: '#ffffff',
                                lineHeight: 1.2,
                                wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </div>

                        {/* Dynamic Description */}
                        {description && (
                            <div
                                style={{
                                    display: 'flex',
                                    fontSize: 22,
                                    color: '#9ca3af',
                                    lineHeight: 1.5,
                                    marginTop: 4,
                                    fontFamily: 'sans-serif',
                                }}
                            >
                                {description}
                            </div>
                        )}
                    </div>

                    {/* Footer Row */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            borderTop: '1px solid rgba(226, 232, 240, 0.1)',
                            paddingTop: 24,
                            marginTop: 'auto',
                        }}
                    >
                        {/* Metadata block (Date/Read Time) */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                            }}
                        >
                            {date && (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        borderRadius: '4px',
                                        padding: '4px 10px',
                                        fontSize: 14,
                                        color: '#9ca3af',
                                        fontFamily: 'monospace',
                                    }}
                                >
                                    <span style={{ color: '#2bcf90', marginRight: 6 }}>DATE:</span> {date}
                                </div>
                            )}

                            {readingTime && (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        borderRadius: '4px',
                                        padding: '4px 10px',
                                        fontSize: 14,
                                        color: '#9ca3af',
                                        fontFamily: 'monospace',
                                    }}
                                >
                                    <span style={{ color: '#e02c48', marginRight: 6 }}>EST:</span> {readingTime}
                                </div>
                            )}
                        </div>

                        {/* Tag Pills */}
                        {parsedTags.length > 0 && (
                            <div
                                style={{
                                    display: 'flex',
                                    gap: 8,
                                    alignItems: 'center',
                                }}
                            >
                                {parsedTags.map((tag) => (
                                    <div
                                        key={tag}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: 'rgba(43, 207, 144, 0.06)',
                                            border: '1px dashed rgba(43, 207, 144, 0.35)',
                                            color: '#2bcf90',
                                            fontSize: 13,
                                            padding: '4px 10px',
                                            borderRadius: '4px',
                                            fontFamily: 'monospace',
                                        }}
                                    >
                                        #{tag}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Site Domain */}
                        <div
                            style={{
                                display: 'flex',
                                fontFamily: 'Departure Mono',
                                fontSize: 18,
                                color: '#2bcf90',
                                fontWeight: 'bold',
                                letterSpacing: '0.5px',
                            }}
                        >
                            sandipmaity.me
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: fontsOption.length > 0 ? fontsOption : undefined,
            },
        );
    } catch (e: any) {
        console.error('Failed to generate dynamic OG image', e);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
