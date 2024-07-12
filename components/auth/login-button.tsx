import { useRouter } from 'next/navigation';

interface LoggginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export default function LoginButton({
  children,
  mode = 'modal',
  asChild = false,
}: LoggginButtonProps) {
  const router = useRouter();

  const onClick = () => {
    router.push('/auth/login');
  };

  if (mode === 'modal') {
    return <span>Implement:</span>;
  }

  return (
    <span onClick={() => console.log('Login')} className='cursor-pointer'>
      {children}
    </span>
  );
}
