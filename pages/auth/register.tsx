import RegisterForm from '../../components/auth/register-form';

export default function Home() {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-700 to-sky-700'>
      <p className='text-white'>
        Se implemento inicialmente el registro de usuarios, pero se cambio a la
        autenticación con next-auth ya que el provedor auth0 permite el registro
        de usuarios
      </p>
      <RegisterForm />
    </div>
  );
}
