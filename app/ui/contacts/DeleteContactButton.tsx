'use client';
import { deleteContact } from "@/app/lib/actions";
export default function DeleteContactButton({ contact }) {

    async function handleDelete() {
        const response = deleteContact(contact.id);
        console.log(response);
    }

    return (
        <>
            <button className="bg-red-400 h-full hover:bg-red-600 rounded-r" onClick={() => { handleDelete() }}>
                Delete {contact.firstName}
            </button>

        </>
    );
}