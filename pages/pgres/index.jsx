import Link from 'next/link';
import React from 'react';

export const getServerSideProps = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/pgres');
    const data = await response.json();

    if (response.status !== 200) throw new Error(data.message);

    return {
      props: { data }
    }
  } catch (error) {
    return {
      props: { error: error.message }
    }
  }
}

const Pgres = (props) => {
  if (props.error) return <h3>{props.error}</h3>

  return (
    <div>
      <h1>Pgres test page</h1>
      {props.data.map((data) => <p key={data.id}>
        <Link href={`/pgres/${data.id}/edit`}>{data.name}</Link>
      </p>)}
    </div>
  );
};

export default Pgres;
