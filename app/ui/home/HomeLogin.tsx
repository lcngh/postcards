import { getSession } from "@auth0/nextjs-auth0";

export default async function HomeLogin() {

    const session = await getSession();
    const user = session?.user;

    return (
        user &&
        <>
            <div className="flex flex-col justify-center items-center">
                <a href='/api/auth/logout'><h1>Logout.</h1></a>
                <hr className="p-2" />
                <a href='/postcards'><h1>Postcards.</h1></a>
                <a href='/contacts'><h1>Contacts.</h1></a>
            </div>

        </>
        || !user &&
        <>
            <a href='/api/auth/login'><h1>Login.</h1></a>
        </>
    );

}