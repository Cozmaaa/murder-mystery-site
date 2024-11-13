// app/login/page.tsx

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';
import jwt from 'jsonwebtoken'


export default async function LoginPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value

  let isAuthenticated=false;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      isAuthenticated = true;
    } catch (err) {
      console.error(err);
    }
  }

  if (isAuthenticated) {
    redirect('/home');
  }

  return <LoginForm />;
}
