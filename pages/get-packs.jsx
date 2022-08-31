/* eslint-disable react/jsx-key */
import { useSession } from 'next-auth/react';
import {useRouter} from "next/router";
import { useQuery } from 'react-query';
import PacksCard from '../components/PacksCard.';
import { getCurrentUser } from '../queries/Users';

// const fetchData = async (query, token, { variables = {} }) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//   };

//   const res = await fetch('http://localhost:8055/graphql/system', {
//     method: 'POST',
//     headers,
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   });

//   const json = await res.json();

//   if (json.errors) {
//     throw new Error(json.errors);
//   }

//   return json.data.users_me;
// };


function GetPacks() {
  // const router = useRouter();
  // const { data: session, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.push('/sign-in');
  //   },
  // });

  // console.log(session);

  // const { data: user, isSuccess } = useQuery('currentUser', async () => await fetchData(getCurrentUser, session.user.accessToken, {}), {
  //   enabled: status === 'authenticated',
  // });

  // if (status !== 'authenticated') return null;

  const packs = [
    {
      "title": "The Starter Pack",
      "image": "db63c230-a66a-4628-b857-e057cc4f4230",
      "description": "This is a starter pack. Buy it and you will get 3 common NonForgets at random fom this collection. But if you are very lucky, you might even get a rare or a legendary one.",
      "price": "9.99"
    },
    {
      "title": "The Elite Pack",
      "image": "015be0a8-e024-43a1-98be-0461768c4fc9",
      "description": "This is an elite pack. Buy it and you will get 3 common, rare or legendary NonForgets at random fom this collection. But if you are very lucky, you might even get all three of the NonForgets legendary ones.",
      "price": "19.99"

    }
  ]

  function click() {
    window.alert('clicked')
  }

  return (
    <section className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-center text-xl font-bold">Get Packs</h1>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {packs && packs.map(pack => <PacksCard
                    image={pack.image}
                    title={pack.title}
                    description={pack.description}
                    price={pack.price}
                    callback={click}
                />)}
            </div>
    </section>
  );
}

export default GetPacks;
