export default function HomePageCard({title, description}: {title: string; description: string}) {
    return (
        <div className=" bg-sidebar p-4 w-full rounded-lg">
          <p className=" text-muted-foreground">{title}</p>
          <h1 className="text-3xl">{description}</h1>
        </div>
    )
}