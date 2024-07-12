import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { sendPostcard, getContacts } from '@/app/lib/actions';
import PostcardList from '@/app/ui/postcards/PostcardList';

export default withPageAuthRequired(async function Postcard(): Promise<React.JSX.Element> {

  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return (
      <>
        <div className="h-svh w-full flex flex-col justify-center items-center">
          <div><a href="/api/auth/login">Login.</a></div>
        </div>
      </>
    )

  }

  const data = await getContacts();
  const [...contacts] = data.data;

  return (
    user && <>
      <div className="h-svh w-full flex flex-col justify-center items-center">
        <form action={sendPostcard}>
          <div>
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
          </div>
        </form>
        <div className="overflow-auto flex flex-col gap-2">
          <PostcardList />

        </div>

      </div>
    </>
  );
}, { returnTo: '/postcards' });
