import HomeLogin from "@/app/ui/home/HomeLogin";

export default function Layout({children}: {children: React.ReactNode}) {
    return(
        <>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="sm:basis-1/5">
                    <HomeLogin/>
                </div>
                <div className="sm:basis-4/5">
                    {children}
                </div>
            </div>
        </>
    );
}