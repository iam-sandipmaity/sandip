import Image from "next/image";

export default function MDXImage(props: any) {
    const { src, alt, width, height, ...rest } = props;
    
    // If width and height are defined, use Next.js Image
    if (width && height) {
        return (
            <span className="my-8 flex justify-center">
                <Image
                    src={src}
                    alt={alt || "Blog image"}
                    width={width}
                    height={height}
                    className="rounded-lg shadow-lg border border-[#222]"
                    {...rest}
                />
            </span>
        );
    }

    // Otherwise standard markdown image without size plugin fallback to a regular styled image
    // eslint-disable-next-line @next/next/no-img-element
    return (
        <span className="my-8 flex justify-center w-full">
            <img
                src={src}
                alt={alt || "Blog image"}
                className="rounded-lg shadow-lg border border-[#222] max-w-full h-auto object-cover"
                loading="lazy"
                {...rest}
            />
        </span>
    );
}
