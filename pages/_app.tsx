import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default MyApp;
