import { useSession } from 'next-auth/react';
import {useRouter} from "next/router";
import { useQuery } from 'react-query';
import { getCurrentUser } from '../queries/Users';
import { NFTCard } from '../components/NFTCard';

const fetchData = async (query, token, { variables = {} }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch('http://localhost:8055/graphql/system', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors);
  }

  return json.data.users_me;
};


function Discover() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/sign-in');
    },
  });

  console.log(session);

  const { data: user, isSuccess } = useQuery('currentUser', async () => await fetchData(getCurrentUser, session.user.accessToken, {}), {
    enabled: status === 'authenticated',
  });

  if (status !== 'authenticated') return null;

  return (
    <section className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      {/* <NFTCard image="4aa18885-4f20-4aad-b9c8-8147d994e001" title="First Artificial Earth Satellite" description="First Artificial Earth Satellite" price="29.99" /> */}
    </section>
  );
}

export default Discover;
