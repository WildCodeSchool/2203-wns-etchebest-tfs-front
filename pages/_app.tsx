import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// Disabling SSR
export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
