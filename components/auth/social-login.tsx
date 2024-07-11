import { Button } from '@/components/ui/button';
import { Github, Linkedin } from 'lucide-react';
import {signIn} from 'next-auth/react';

export const SocialLogin = () => {
  const login = () => {
      signIn('auth0', {
        callbackUrl: '/api/auth/callback/auth0',
      }).then(r => console.log(r))
  }

  return (
    <div className='flex w-full items-center gap-x-2 maa'>
      <Button className='w-full' variant='outline' onClick={()=> login()}>
        <Github />
      </Button>
      <Button className='w-full gap-x-1 ' variant='outline' onClick={() => {}}>
        <Linkedin />
      </Button>
    </div>
  );
};
