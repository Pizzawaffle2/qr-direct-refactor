import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <a href="/api/auth/logout">Logout</a>
        </>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </div>
  );
}
