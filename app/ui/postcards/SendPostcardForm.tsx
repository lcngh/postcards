import { sendPostcard } from "@/app/lib/actions";
import ContactOptions from "@/app/ui/postcards/ContactOptions";
import { getSession } from "@auth0/nextjs-auth0";

export default async function SendPostcardForm() {
    const session = await getSession();
    const user = session?.user;

    if (!user) return (<></>);

    return (
        user && <>
            <form action={sendPostcard}>
                <div>
                    <ContactOptions />
                </div>
            </form>
            <div><a href="/api/auth/logout">Logout</a></div>
        </>
    );
}