"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { deleteAccount } from "@/lib/server/appwrite";


export default function Settings() {
    // Get the current date
    // Function to Add days to current date
    function addDays(date, days) {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + days);
        return newDate;
    }

    // Get the current date
    const todayDate = new Date();

    // Number of days that we want to add to the current date
    const days = 7;

    // Function call to add days
    const newDate = addDays(todayDate, days);

    console.log("New Date: ", newDate.toDateString());
    return (
        <div className="w-full">
            <h1 className="text-3xl mb-4 px-4 pt-2">Settings</h1>
            <Separator />

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="destructive">Delete account</Button>
                </DialogTrigger>
                <DialogContent  className="!w-[full] !max-w-[50vw]">
                    <DialogHeader >
                    <DialogTitle className="mb-4">Are you sure?</DialogTitle>
                    <DialogDescription>
                        If you continue to delete your account we will deactivate it for the next 30 days.
                        After the 30 days have elapsed all data linked to your account and your account will be perementaly deleted.
                        <br/><br/>
                        We will notify you by email before permantly deleting your account!
                        <br/><br/>
                        If you continue your account will be deleted on {new Date().setDate(new Date().getDate() + 30).toLocaleString()}
                    </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="destructive" onClick={() => {deleteAccount()}}>Delete account</Button>
                        <Button variant="outline">Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}