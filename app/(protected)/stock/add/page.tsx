import AddStockForm from "./addStockForm";

export default function AddStock() {
    return (
        <main className="px-8 py-4 flex flex-col gap-4">
            <div>
                <h3 className="!font-bold text-lg">Add stock</h3>
                <p className="text-muted-foreground">Use this form to add stock to a already existing stock</p>
            </div>
            <AddStockForm />
        </main>
    )
}