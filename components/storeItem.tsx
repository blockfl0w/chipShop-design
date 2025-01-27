import { ReactNode } from "react";
import Image from "next/image";

export default function StoreItem({children, name, description}: {children: ReactNode; name: string, description: string}) {
    return (
        <div className="flex flex-col w-full bg-sidebar rounded-lg overflow-hidden min-w-80" >
            <div className="h-full relative w-full min-h-32">
                <Image className="" width={600} height={200} src="https://placehold.co/600x200/png" alt="placeholder" sizes="(min-width: 808px) 50vw, 100vw" />
            </div>
            <div className="p-2 flex flex-col gap-4">
                <h3 className="text-lg">{name}</h3>
                <p className="text-muted-foreground">{description}</p>
                {children}
            </div>
        </div>
    )
}