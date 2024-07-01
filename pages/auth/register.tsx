import RegisterForm from '../../components/auth/register-form';

export default function Home() {
  return (
    <div
      className='flex h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-700 to-sky-700'
    >
        <RegisterForm />
    </div>
  );
}
