"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { getStock, getUser } from "@/lib/server/appwrite";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Data {
  $id: string;
  name: string;
  amount: number;
  imageSrc: string;
  description: string;
  createdBy: {
    name: string;
  };
}
interface Document {
  documents: Data[];
}
// Next.js will invalidate the cache when a
// request

export default function Stock() {
  const [data, setData] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = (await getStock()) as unknown as Document;

        if (res) {
          res.documents.map(async (item) => {
            const user = await getUser(item.createdBy.name);
            if (user) {
              item.createdBy = user;
            }
          });
        }
        setData(res);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  console.log(data);
  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="w-full flex gap-4 justify-end px-4 absolute top-8 right-0 z-10">
        <Button asChild variant="outline">
          <Link href="/stock/add" prefetch>
            Add stock
          </Link>
        </Button>
        <Button asChild>
          <Link href="/stock/create" prefetch>
            New stock
          </Link>
        </Button>
      </div>
      <h2 className="text-2xl font-bold">Stock levels</h2>
      {loading ? (
        <div className="flex flex-col gap-14 rounded-lg">
          <Skeleton className="w-full h-14" />
          <Skeleton className="w-full h-14" />
          <Skeleton className="w-full h-14" />
          <Skeleton className="w-full h-14" />
        </div>
      ) : (
        <Table className="rounded-lg overflow-hidden">
          <TableHeader className="bg-neutral-900 rounded-lg">
            <TableRow>
              <TableHead className="max-w-[10rem]">Product</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.documents.map((stock: Data) => (
              <TableRow key={stock.$id}>
                <TableCell className="font-medium w-fit">
                  {stock.name}
                </TableCell>
                <TableCell className="text-center">
                  {stock.description}
                </TableCell>
                <TableCell className="text-right">{stock.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
}
