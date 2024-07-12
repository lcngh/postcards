'use server';
import { getSession } from "@auth0/nextjs-auth0";
import { fetchPostGrid } from "@/app/utils/fetchUtils"

export async function sendPostcard(formData: FormData) {
  const session = await getSession();
  const user = session?.user;
  if (user === undefined) {
    console.log('unauthorized');
    return {error : 'unauthorized'}
  }

  const contact = formData.get('contact');
  console.log(user.name);

  const requestOptions = {
      method: 'POST',
      headers: {
          'x-api-key': process.env.API_KEY,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          to: contact,
          from: contact,
          frontHTML: 'Hello friend.',
          backHTML: 'Bye friend.',
          size: '6x4',
          metadata: {"user":`${user.name}`},
      }),
  }

  const data = await fetchPostGrid(process.env.POSTGRID_URL + '/postcards', requestOptions);
  console.log(data);
  return {message: 'OK'};

}

export async function makeContact(formData : FormData) {
  const session = await getSession();
  const user = session?.user;
  if (user === undefined) {
    console.log('unauthorized');
    return {error : 'unauthorized'}
  }

  const formContact = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    addressLine1: formData.get("addressLine1"),
    city: formData.get("city"),
    provinceOrState: formData.get("provinceOrState"),
    countryCode: formData.get("countryCode"),
    metadata: {"user":`${user.name}`},
  }
  
  const requestOptions = {
      method: 'POST',
      headers: {
          'x-api-key': process.env.API_KEY,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formContact),
  }

  const data = await fetchPostGrid(process.env.POSTGRID_URL + '/contacts', requestOptions);

  console.log(data);
  return {message: 'OK'};

}

export async function getContacts() {
  const session = await getSession();
  const user = session?.user;
  if (user === undefined) {
    console.log('unauthorized');
    return {error : 'unauthorized'}
  }

  const requestOptions = {
      method: 'GET',
      headers: {
          'x-api-key': process.env.API_KEY,
          'Content-Type': 'application/json',
      },
  }

  const data = await fetchPostGrid(process.env.POSTGRID_URL + `/contacts?search={"metadata.user":"${user.name}"}`, requestOptions);

  return data;


}

export async function deleteContact(contactID : string) {
  const session = await getSession();
  const user = session?.user;
  if (user === undefined) {
    console.log('unauthorized');
    return {error : 'unauthorized'}
  }

  const requestOptions = {
      method: 'DELETE',
      headers: {
          'x-api-key': process.env.API_KEY,
          'Content-Type': 'application/json',
      },
  }

  const data = await fetchPostGrid(process.env.POSTGRID_URL + `/contacts/${contactID}`, requestOptions);

  console.log(data);

  return data;


}

export async function getPostcards() {
  const session = await getSession();
  const user = session?.user;
  if (user === undefined) {
    console.log('unauthorized');
    return {error : 'unauthorized'}
  }

  const requestOptions = {
      method: 'GET',
      headers: {
          'x-api-key': process.env.API_KEY,
          'Content-Type': 'application/json',
      },
  }

  const data = await fetchPostGrid(process.env.POSTGRID_URL + `/postcards?search={"metadata.user":"${user.name}"}`, requestOptions);

  return data;


}