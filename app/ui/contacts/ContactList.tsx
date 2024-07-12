import { getContacts } from "@/app/lib/actions";
import { getSession } from "@auth0/nextjs-auth0";
import DeleteContactButton from "@/app/ui/contacts/DeleteContactButton";
import ContactInfo from "@/app/ui/contacts/ContactInfo";

export async function ContactList() {

    const session = await getSession();
    const user = session?.user;

    if (!user) return (<><a href="/api/auth/login">Login.</a></>);

    const data = await getContacts();
    const [...contacts] = data.data;

    return (
        contacts &&
        <>
            {contacts.map((contact) => {

                return (
                    <div key={contact.id} className="flex flex-row justify-center items-center bg-amber-50 w-72 h-40 mb-3 rounded">
                        <div className="mr-6 basis-3/4">
                            <ContactInfo contact={contact} />
                        </div>
                        <div className="h-full basis-1/4">

                            <DeleteContactButton contact={contact} />
                        </div>

                    </div>
                )
            })}
        </>
    );
}