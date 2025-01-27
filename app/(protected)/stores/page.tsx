"use client"
import StoreItem from "@/components/storeItem";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Stores() {
    const [stores, setStores] = useState([{name: "Newcastle", selected: true, description: "This is the newcastle branch"},{name: "Gateshead", selected: false, description: "This is the gateshead branch"},{name: "Durham", selected: false, description: "This is the durham branch"},{name: "Glasgow", selected: false, description: "This is the glasgow branch"}])

    function selectNewStore(item: {name: string}) {
        setStores(prevStores => prevStores.map(store => ({
            ...store,
            selected: store.name === item.name
        })));
    }
    return (
        <div className="p-8">
            <h3 className="text-2xl">Stores</h3>
            <div className="grid grid-cols-3 gap-8">
                {stores.map((item) => (<StoreItem name={item.name} description={item.description} key={item.name}>{item.selected ? <Button disabled>Selected</Button>: <Button onClick={() => selectNewStore(item)}>Select</Button>}</StoreItem>))}
            </div>
        </div>
    )
}