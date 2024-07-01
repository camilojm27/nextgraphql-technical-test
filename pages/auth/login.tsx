import { LoginForm } from '../../components/auth/login-form';

export default function Login() {
  return (
    <div
      className='flex h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-700 to-sky-700'
    >
        <LoginForm />
    </div>
  );
}
