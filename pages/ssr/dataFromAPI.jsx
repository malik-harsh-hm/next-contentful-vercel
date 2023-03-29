const DataFromAPI = ({ myProp }) => {
  return (
    <>
      <pre>{JSON.stringify(myProp, null, 2)}</pre>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const res = await fetch("http://localhost:3000/api/someProtectedAPI", {
    headers: {
      Cookie: ctx.req.headers.cookie,
    },
  });
  const data = await res.json();
  return {
    props: {
      myProp: data,
    },
  };
}

export default DataFromAPI;
