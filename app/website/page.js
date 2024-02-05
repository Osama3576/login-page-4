'use client';
import { signOut } from 'next-auth/react';
import { Button } from '../../components/ui/button';

function page() {
  return (
    <div>
      You are Logged In
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}

export default page;
