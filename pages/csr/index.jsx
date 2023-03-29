import { useUser } from "@auth0/nextjs-auth0/client";

const CSR = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user)
    return (
      <div>
        <p>Please login to access this page</p>
      </div>
    );
  return (
    <>
      <div>Welcome {user.name} to your profile page</div>
      <pre data-testid="profile">{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default CSR;
