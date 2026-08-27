import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="mx-auto max-w-3xl px-6 py-32 md:py-40 font-mono flex flex-col items-center text-center">
            {/* Cute ASCII Cat Art */}
            <pre className="text-accent-teal text-3xl md:text-4xl mb-6 leading-tight select-none font-bold">
{`  /\\_/\\
  ( o.o )
  > ^ <`}
            </pre>

            <h1 className="text-3xl font-semibold text-subtle-text mb-4 md:text-4xl">
                404: Lost in the Circuits
            </h1>

            <p className="max-w-md text-base leading-8 text-muted mb-10">
                Meow! You&apos;ve wandered off the motherboard. The electrons searched everywhere, but this path doesn&apos;t lead anywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link
                    href="/"
                    className="px-6 py-2.5 text-sm font-semibold rounded-md border border-surface bg-subtle-text text-near-black hover:bg-accent-teal hover:text-near-black hover:border-accent-teal transition-all"
                >
                    Back to safety
                </Link>
                <Link
                    href="/blog"
                    className="px-6 py-2.5 text-sm font-semibold rounded-md border border-surface text-subtle-text hover:border-accent-teal hover:text-accent-teal transition-all"
                >
                    Read the blog
                </Link>
            </div>
        </div>
    );
}
