import Image from "next/image";
import Link from "next/link";

export default function ProductLink({src, alt, href, title, description}: {src: string; alt: string; href: string, title: string; description: string;}) {
    return (
        <Link className="flex flex-col w-fit bg-sidebar rounded-lg overflow-hidden min-w-80 max-w-80" href={href}>
            <div className="h-full relative w-full min-h-32">
                <Image className=" object-fill" fill src={src} alt={alt} sizes="(min-width: 808px) 50vw, 100vw" />
            </div>
            <div className="p-2">
                <h3 className="text-lg">{title}</h3>
                <p className="text-muted-foreground font-regular">{description}</p>
            </div>
        </Link>
    )
}