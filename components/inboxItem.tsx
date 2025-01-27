import { ReactNode } from "react";

export default function InboxItem({message, viewed, children}: {message: string, viewed: boolean, children: ReactNode}) {
    return (
        <div className="flex w-full justify-between items-center py-4 px-8 border-b hover:bg-neutral-900 first:border-t">
            <div className="flex gap-8">
                {children}
                <p>{message}</p>
            </div>
            {!viewed ? <span className="w-2 h-2 aspect-square rounded-full bg-blue-600"></span>: null}
        </div>
    )
}