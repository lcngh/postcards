import { getPostcards } from "@/app/lib/actions";
import { getSession } from "@auth0/nextjs-auth0";

export default async function PostcardList() {
    const session = await getSession();
    const user = session?.user;

    if (!user) return (<><a href="/api/auth/login">Login.</a></>);

    const data = await getPostcards();

    console.log(data);

    const [...postcards] = data.data;

    console.log(postcards);

    return (
        postcards &&
        <>
            {postcards.map((postcard) => {
                return (
                    <div key={postcard.id}>
                        <a href={postcard.url}>
                            <div className="h-[200px] w-[300px] text-slate-900 bg-amber-50 hover:bg-amber-100 flex flex-row">
                                <div className="basis-2/3 text-xs">
                                    <p>{postcard.frontHTML}</p>
                                </div>
                                <div className="w-[2px] bg-slate-200 m-2"></div>
                                <div className="basis-1/3">
                                    <div className="h-3/5">
                                    </div>
                                    <div className="text-xs">
                                        <p> {postcard.to.firstName} {postcard.to.lastName}</p>
                                        <p> {postcard.to.addressLine1}</p>
                                        <p> {postcard.to.city}, {postcard.to.provinceOrState}</p>
                                        <p> {postcard.to.countryCode} </p>
                                    </div>
                                </div>
                            </div>
                        </a>

                    </div>
                )
            })}
        </>
    );
}