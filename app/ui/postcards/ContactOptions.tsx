import { getContacts } from "@/app/lib/actions";
import { getSession } from "@auth0/nextjs-auth0";

export default async function ContactOptions() {
    const session = await getSession();
    const user = session?.user;

    if (!user) return (<></>);

    const data = await getContacts();
    const [...contacts] = data.data;

    return (
        user &&
        <>
            <label htmlFor="contacts">Choose a contact:</label>
            <select id="contacts" name="contact">
                {contacts.map((contact) => {
                    return (
                        <option key={contact.id} value={contact.id}>{contact.firstName}</option>
                    );
                })}
            </select>
            <button
                type="submit"
                className="border-solid border-2 border-sky-500 hover:bg-white h-8">
                Send Postcard
            </button>
        </>
    );
}