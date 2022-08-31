import Link from "next/link";
import { React, useState } from "react";
import styles from "../styles/Home.module.css";
import { WALLET_ADAPTERS } from "@web3auth/base";
import { useWeb3Auth } from "../services/web3auth";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router'



export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter()


  // const web3authSdk = Web3auth;
      let web3AuthInstance = null;

      // (async function init() {
      //   // $(".btn-logged-in").hide();
      //   // $("#sign-tx").hide();

      //   web3AuthInstance = new web3authSdk.Web3Auth({
      //     chainConfig: { chainNamespace: "eip155" },
      //     clientId: "BDaIxaw3KHG0MoCMglIQNGSK2KsDWHX4SARPEvC_BTVdRdawiS8gD8XisPVOTU3cc5DjggAM_QHqcf7hxpY3f5I", // get your clientId from https://developer.web3auth.io
      //   });

      //   subscribeAuthEvents(web3AuthInstance);

      //   await web3AuthInstance.initModal();
      //   console.log("web3AuthInstance", web3AuthInstance, web3AuthInstance.provider);
      //   if (web3AuthInstance.provider) {
      //     $(".btn-logged-in").show();
      //     $(".btn-logged-out").hide();
      //     if (web3AuthInstance.connectedAdapterName === "openlogin") {
      //       $("#sign-tx").show();
      //     }
      //   } else {
      //     $(".btn-logged-out").show();
      //     $(".btn-logged-in").hide();
      //   }
      // });
      

      function subscribeAuthEvents(web3auth) {
        web3auth.on("connected", (data) => {
          console.log("Yeah!, you are successfully logged in", data);
        });

        web3auth.on("connecting", () => {
          console.log("connecting");
        });

        web3auth.on("disconnected", () => {
          console.log("disconnected");
        });

        web3auth.on("errored", (error) => {
          console.log("some error or user have cancelled login request", error);
        });

        web3auth.on("MODAL_VISIBILITY", (isVisible) => {
          console.log("modal visibility", isVisible);
        });
      }

      // async function login() {
      //   try {
      //     const provider = await web3AuthInstance.connect();
      //     console.log("provider after login", provider);
      //     // $(".btn-logged-out").hide();
      //     // $(".btn-logged-in").show();
      //   } catch (error) {
      //     console.error(error.message);
      //   }
      // }

      // //logout
      // async function logout() {
      //   try {
      //     await web3AuthInstance.logout();
      //     // $(".btn-logged-in").hide();
      //     // $(".btn-logged-out").show();
      //   } catch (error) {
      //     console.error(error.message);
      //   }
      // }

  const { status } = useSession();
  const {
    provider,
    login,
    logout,
    getUserInfo,
    getAccounts,
    getBalance,
    signMessage,
    signTransaction,
    signAndSendTransaction,
    web3Auth,
    chain,
  } = useWeb3Auth();
  // const [accounts, setAccounts] = useState(  );

  async function balance() {
    try {
      // const web3 = new Web3(web3AuthInstance.provider);
      const accounts =  await provider.getAccounts();
      const balance =  await provider.getBalance(accounts[0]);
      console.log('balance' ,balance)
      return JSON.stringify(["Eth balance", balance], null, 2);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function signin() {
    await login();
    router.push('/sign-in')

  }

  // function setData() {
  //   if (provider) {
  //     // provider.getUserInfo.then( (data) => {
  //     //   setAccounts(data);
  //     // }).catch(
  //     //   (err) => {console.log(err)}
  //     // )
  //     // // setAccounts(acct);
  //     setAccounts(getAccounts);
  //     console.log(accounts);
  //   }
    
  // }

  const loggedInView = (
    <div className="hidden md:flex justify-start md:flex-2">
                <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                  <a class="mr-5 hover:text-gray-900" href="/user-area">
                    Dashboard
                  </a>
                  <a class="mr-5 hover:text-gray-900" href="/discover">
                    Discover
                  </a>
                  <a class="mr-5 hover:text-gray-900" href="/get-packs">
                    Get Packs
                  </a>
                  <a class="mr-5 hover:text-gray-900" href="/leaderboard">
                    Leaderboard
                  </a>
                  {/* <a class="mr-5 hover:text-gray-900" href="/memodex">
                    Memodex
                  </a> */}
                </nav>
              </div>
  );

  return (
    <>
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <a className="font-black">Non-forget</a>
              </Link>
            </div>
            {provider ? loggedInView : (
              <div className="flex"></div>
            )}

            <div className="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
                onClick={() => setMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            {provider ? (
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                
                {/* {provider.getAccounts()
                .then((accts) => {console.log(accts)}).
                catch((msg) => console.log('cant  get accounts'))} */}
                {/* setAccounts();
                console.log(accounts);} */}
{/*                 
                <span>{provider ? (  
                <p>{balance()}</p>) : (<p>not logged in</p>)}</span> */}
                <button
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  onClick={() => logout({ callbackUrl: "/" })}
                >
                  Sign out
                </button>
                {/* <Link href="/user-area">
                  <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            User area
          </a>
                  <a></a>
                </Link> */}
              </div>
            ) : (
            //   <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            //     <Link href="/sign-in">
            //       <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
            //         Sign in
            //       </a>
            //     </Link>
            //     <Link href="/sign-up">
            //       <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            //         Sign up
            //       </a>
            //     </Link>
            //   </div>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <button
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  onClick={() => {
                    // login({ callbackUrl: "/sign-in" });
                    // setData();
                    signin();
                }}
                >
                  {/* <a class="mr-5 hover:text-gray-900" href="/sign-in"> */}
                  Sign In
                  {/* </a> */}
                </button>
              </div>
            )}
          </div>
        </div>
        <div
          className={`absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <Link href="/">
                    <a className="font-black">Non-Forget</a>
                  </Link>
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
            {provider ? (
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <button
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  onClick={() => logout({ callbackUrl: "/" })
                }
                >
                  Sign out
                </button>
                {/* <Link href="/user-area">
                  <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            User area
          </a>
                  <a></a>
                </Link> */}
              </div>
            ) : (
            //   <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            //     <Link href="/sign-in">
            //       <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
            //         Sign in
            //       </a>
            //     </Link>
            //     <Link href="/sign-up">
            //       <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            //         Sign up
            //       </a>
            //     </Link>
            //   </div>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <button
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  onClick={() => login({ callbackUrl: "/user-area" })}
                >
                  Sign In
                </button>
              </div>
            )}
              {/* <div>
                <Link href="/sign-up">
                  <a className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Sign up
                  </a>
                </Link>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing user?
                  <Link href="/sign-in">
                    <a className="text-indigo-600 hover:text-indigo-500">
                      Sign in
                    </a>
                  </Link>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
