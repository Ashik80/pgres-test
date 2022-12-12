import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const getServerSideProps = async (context) => {
  try {
    const id = context.query.id;

    const response = await fetch(`http://localhost:3000/api/pgres/${id}`);
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

  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const value = Object.fromEntries(formData);

    try {
      const response = await fetch(`http://localhost:3000/api/pgres/${props.data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      });

      const data = await response.json();

      if (response.status !== 200) throw new Error(data.message);

      router.push('/pgres');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h1>Pgres edit form</h1>
      <form onSubmit={onSubmit}>
        <input name='name' defaultValue={props.data.name} /><br />
        <textarea name='description' defaultValue={props.data.description} /><br />
        <p style={{ color: 'red' }}>{error}</p>
        <input type="submit" value="Submit" />
      </form>
      <Link href="/pgres">Back to list</Link>
    </div>
  );
};

export default Pgres;
