"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
const formSchema = z.object({
  stockID: z.string(),
  amount: z.number().min(1)
})

const stockItems = [{name: "Chicken nuggets", id: 0, }, {name: "Chips", id: 1}]

export default function AddStockForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            stockID: "0",
            amount: 0
        },
    })
    
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="stockID"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Stock item</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Please select a stock" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {stockItems.map((item) => 
                                        (<SelectItem value={item.id.toString()} key={item.id}>{item.name}</SelectItem>)
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} min="1" value="1" />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
            
    )
}

// function SelectItems({ field, stockItems }) {
//   // Memoize the mapped stockItems to prevent unnecessary recomputation
//   const selectItems = useMemo(
//     () => stockItems.map((item) => (
//       <div key={item.id}>
//         <SelectItem value={item.id}>{item.name}</SelectItem>
//       </div>
//     )),
//     [stockItems] // Recompute only when stockItems changes
//   );

//   return (
//     <Select onValueChange={field.onChange} defaultValue={field.value}>
//       <SelectTrigger className="">
//         <SelectValue placeholder={stockItems[0]?.name || "Select an item"} />
//       </SelectTrigger>
//       <SelectContent>
//         {selectItems}
//       </SelectContent>
//     </Select>
//   );
// };