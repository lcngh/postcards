export default function ContactInfo({ contact }) {
    return (
        <>
            <div className="flex flex-col pl-6 text-slate-800">
                <div><p>{contact.firstName} {contact.lastName}</p></div>
                <div><p>{contact.addressLine1}</p></div>
                <div><p>{contact.city}, {contact.provinceOrState}</p></div>
                <div><p>{contact.countryCode}</p></div>
            </div>

        </>
    );
}