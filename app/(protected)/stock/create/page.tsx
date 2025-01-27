"use client";
import DragAndDrop from "@/components/fileDropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { X } from "lucide-react";
import { MutableRefObject, useRef, useState } from "react";
import submit from "./submit";
import { Client, ID, Storage } from "appwrite";

export default function CreateStock() {
  const [previews, setPreviews] = useState([]);
  const [file, setFile] = useState(null);

  const nameInputRef:
    | MutableRefObject<HTMLInputElement>
    | MutableRefObject<null> = useRef(null);
  const nameDescRef:
    | MutableRefObject<HTMLInputElement>
    | MutableRefObject<null> = useRef(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function test(acceptedFiles: any) {
    setPreviews(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    setFile(acceptedFiles[0]);
  }

  function clearPreview() {
    setPreviews([]);
  }

  async function createStockItem() {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

    const storage = new Storage(client);

    let link = null;
    if (file !== null) {
      console.log(process.env.NEXT_PUBLIC_PROFILE_BUCKET as string);
      const res = await storage.createFile(
        process.env.NEXT_PUBLIC_PROFILE_BUCKET as string,
        ID.unique(),
        file
      );
      link = storage.getFileView(
        process.env.NEXT_PUBLIC_PROFILE_BUCKET as string, // bucketId
        res.$id // fileId
      );
      console.log(res, link);
    }

    submit(
      link ? link : "",
      nameInputRef.current?.value as string,
      nameDescRef.current?.value as string
    );
  }

  const previewElements = previews.map(
    (file: { name: string; preview: string }) => (
      <div key={file.name} className="relative w-fit mt-4">
        <button
          className="p-1 flex items-center absolute right-0 translate-x-[50%] translate-y-[-50%] top-0 bg-neutral-50 dark:bg-neutral-950 border aspect-square w-fit rounded-full"
          onClick={clearPreview}
        >
          <X className="w-5 aspect-square" />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="rounded-lg border-2 max-w-80 max-h-80"
          src={file.preview}
          alt=""
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    )
  );
  return (
    <main className="p-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Label>Image of the stock</Label>
        {previews.length > 0 ? (
          previewElements
        ) : (
          <DragAndDrop acceptedExtensions={["jpg", "png"]} onDrop={test} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Name of your stock</Label>
        <Input type="text" min={3} max={100} required ref={nameInputRef} />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Describe your stock</Label>
        <Input type="text" min={15} max={500} ref={nameDescRef} />
      </div>
      <Button onClick={createStockItem}>Create stock</Button>
    </main>
  );
}
