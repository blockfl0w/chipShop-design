import InboxItem from "@/components/inboxItem"
import { Beef, ChartNoAxesCombined, CircleAlert, Store, TriangleAlert } from "lucide-react"

export default function Inbox() {
    const notifcations = [{icon: CircleAlert, message: "A new user was added", viewed: false},{icon: TriangleAlert, message: "Stock is running low on coke", viewed: false},{icon: Store, message: "New store added called 'newcastle'", viewed: false},{icon: Beef, message: "Just a notifcation to you", viewed: true}, {icon: ChartNoAxesCombined, message: "Chips price has increased!", viewed: true}]
    return (
        <div className="w-full flex flex-col gap-4">
            <h3 className="text-2xl px-4 pt-4">Inbox</h3>
            <div className="flex flex-col w-full">
                {notifcations.map((item) => (<div key={item.message}><InboxItem message={item.message} viewed={item.viewed} ><item.icon className="text-muted-foreground"/></InboxItem></div>))}
            </div>
        </div>
    )
}