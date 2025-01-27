"use client";
import React, { useEffect } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

export default function DropZone({
  acceptedExtensions,
  onDrop,
}: {
  acceptedExtensions?: string[];
  onDrop?: (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
}) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg"],
    },
    maxFiles: 1,
    onDrop(acceptedFiles, fileRejections, event) {
      if (onDrop !== undefined) {
        onDrop(acceptedFiles, fileRejections, event);
      }
    },
  });

  useEffect(() => {
    console.log(acceptedFiles);
  }, [acceptedFiles]);
  return (
    <section className="w-full border-2 border-dashed dark:border-neutral-700 p-4 rounded-lg text-center cursor-pointer">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag and drop files here or click to select files</p>
        <p className="flex gap-2 w-full justify-center text-muted-foreground">
          Accepted file types:{" "}
          {acceptedExtensions?.map((item) => (
            <span key={acceptedExtensions.indexOf(item)}>.{item}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
