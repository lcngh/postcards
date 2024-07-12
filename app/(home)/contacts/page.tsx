import { makeContact } from '@/app/lib/actions'
import { ContactList } from '@/app/ui/contacts/ContactList';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Contacts(): Promise<React.JSX.Element> {

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

  return (
    user && <>
      <div className="h-svh w-full flex flex-col justify-center items-center">
        <div className='mx-2'><h1>Hello, {user.name}</h1></div>
        <form action={makeContact}>
          <div>
            <label className='block pt-2' htmlFor="firstName">First Name</label>
            <input className='text-black' type="text" id='firstName' name='firstName' />
          </div>
          <div>
            <label className='block pt-2' htmlFor="lastName">Last Name</label>
            <input className='text-black' type="text" id='lastName' name='lastName' />
          </div>
          <div>
            <label className='block pt-2' htmlFor="addressLine1">Address Line 1</label>
            <input className='text-black' type="text" id="addressLine1" name='addressLine1' />
          </div>
          <div>
            <label className='block pt-2' htmlFor="city">City</label>
            <input className='text-black' type="text" id='city' name='city' />
          </div>
          <div>
            <label className='block pt-2' htmlFor="provinceOrState">State or Province</label>
            <input className='text-black' type="text" id='provinceOrState' name='provinceOrState' />
          </div>
          <div>
            <label className='block pt-2' htmlFor="countryCode">Country code</label>
            <input className='text-black' type="text" id='countryCode' name='countryCode' />
          </div>
          <div className='flex items-center justify-center'>
            <button
              type="submit"
              className="border-solid border-2 border-slate-400 bg-amber-50 hover:border-sky-500 hover:bg-amber-100 text-slate-900 hover:text-black h-8 my-2">
              Add Contact
            </button>
          </div>


        </form>
        <div className='overflow-auto mb-2'>
          <ContactList />
        </div>

      </div>
    </>
  );
}, { returnTo: '/contacts' });
