import "../styles/globals.css";
import Layout from "../components/templates/Layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";

function MyApp({ Component, pageProps }) {
  // You can optionally pass the `user` prop from pages that require server-side
  // rendering to prepopulate the `useUser` hook.
  const { user } = pageProps;
  return (
    <UserProvider user={user}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
