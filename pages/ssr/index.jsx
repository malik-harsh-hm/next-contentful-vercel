import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const SSR = ({ user, someProtectedInfo }) => {
  return (
    <>
      <div>Welcome {user.name} to your profile page</div>
      <p>{someProtectedInfo}</p>
      <pre data-testid="profile">{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps() {
    return {
      props: {
        someProtectedInfo: "this is protected info",
      },
    };
  },
});

export default SSR;
