// src/app/page.jsx
import HomePageCard from "@/components/hompageCard"
import ProductLink from "@/components/productLink"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function Home() {
  const totalStock = 365
  const totalStockMax = 1000

  const products = [{name: "Example", description: "This is an example", href: "/products/example", alt: "example", src: "https://placehold.co/600x400/png", id: 0}, {name: "Example", description: "This is an example", href: "/products/example", alt: "example", src: "https://placehold.co/600x400/png", id: 1}, {name: "Example", description: "This is an example", href: "/products/example", alt: "example", src: "https://placehold.co/600x400/png", id: 2}]

  const transactions = [{amount: 100, productName: "Chicken Nuggets", quantity: 10, orderer: "Charlie", id: 0}, {amount: 100, productName: "Chicken Nuggets", quantity: 10, orderer: "Charlie", id: 1}, {amount: 100, productName: "Chicken Nuggets", quantity: 10, orderer: "Charlie", id: 2}]
  return (
    <main className="p-8 space-y-4">
      <section className="flex justify-around gap-8 w-full">
        <HomePageCard description={`${totalStock}/${totalStockMax}`} title="Total stock"/>
        <HomePageCard description={`${totalStock}/${totalStockMax}`} title="Total stock"/>
        <HomePageCard description={`${totalStock}/${totalStockMax}`} title="Total stock"/>
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="text-2xl">Running out soon!</h2>
        <div className="flex gap-4">
          {products.map((item) => (<ProductLink src={item.src} key={item.id} title={item.name} description={item.description} href={item.href} alt={item.alt} />)
          )}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl">Recent transactions</h2>
         <Table className="rounded-lg overflow-hidden">
          <TableHeader className="bg-neutral-900 rounded-lg">
            <TableRow>
              <TableHead className="max-w-[10rem]">Product</TableHead>
              <TableHead className="w-[100px]">Quantity</TableHead>
              <TableHead>Ordered by </TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium w-fit">{invoice.productName}</TableCell>
                <TableCell className="text-center">{invoice.quantity}</TableCell>
                <TableCell>{invoice.orderer}</TableCell>
                <TableCell className="text-right">£{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </section>
    </main>
  )
}
