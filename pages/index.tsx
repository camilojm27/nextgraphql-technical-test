import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {

  return (
    <div className="flex h-screen flex-row items-center justify-center gap-5 bg-gradient-to-b from-blue-700 to-sky-700">
      <Card className="w-[450px] bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-800 text-center">Prueba Tecnica Prevalent</h2>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">La prueba consiste en desarrollar una aplicación web usando Next.js, graphql, shadcn, prisma</p>
        </CardContent>
        <CardContent>
          <p className="text-gray-600">El despliegue se debe realizar en vercel y supabase (postgres)</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" >
            <Link href="http://github.com/camilojm27" target="_blank" rel="noopener noreferrer" className="inline-flex">
              <GithubIcon className="mr-2 h-4 w-4" />
              Realizado por Camilo Mezú Mina
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
