"use client";

type ErrorProps = {
  error: {
    message: string;
  };
};

function Error({ error }: ErrorProps) {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>{error.message}</p>
    </main>
  );
}

export default Error;
