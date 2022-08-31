/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import 'tailwindcss/tailwind.css'
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import MiniCart from "../components/MiniCart";
import Header from "../components/Header";
import NFTCard from '../components/NFTCard';
import { SessionProvider } from 'next-auth/react';
import { WEB3AUTH_NETWORK_TYPE } from "../config/web3AuthNetwork";
import { useState } from "react";
import { CHAIN_CONFIG_TYPE } from "../config/chainConfig";
import { Web3AuthProvider } from "../services/web3auth";
import { DirectusProvider } from 'react-directus';




function MyApp({ Component, session, pageProps }: AppProps) {
  
  const queryClient = new QueryClient()
  const [web3AuthNetwork, setWeb3AuthNetwork] = useState<WEB3AUTH_NETWORK_TYPE>("testnet");
  const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>("polygon");

  return (
    <>
    <Head>
    <script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1/dist/web3.min.js"></script>
    {/* <script src="./web3auth.umd.min.js"></script> */}
        </Head>
      <DirectusProvider apiUrl="http://localhost:8055/">
      <QueryClientProvider client={queryClient}>
      <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}>
        <SessionProvider session={session}>
          <Header></Header>
          <Component {...pageProps} />
        </SessionProvider>
        </Web3AuthProvider>
          {/* <ReactQueryDevtools initialIsOpen={false}/> */}
      </QueryClientProvider>
      </DirectusProvider>
    </>
  )
}

export default MyApp;
