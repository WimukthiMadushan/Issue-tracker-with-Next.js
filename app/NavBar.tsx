'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { useSession } from "next-auth/react";
import { FaBug } from "react-icons/fa";
import { Avatar, Box, Button, Container, DropdownMenu, Flex , Text} from '@radix-ui/themes';
import Skeleton from '@/app/components/Skelton'
const NavBar = () => { 
    
  return (
    <nav className='border-b-2 mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between' align='center'>
          <NavLinks/>
          <AuthState/>
        </Flex> 
      </Container>  
    </nav>
  )
}

export default NavBar

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' }
  ]
  return(
        <Flex align='center' gap='3'>
          <Link href={'/'}><FaBug /></Link>
          <ul className='flex space-x-6'>
              {links.map((link) => (
                  <li className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`} key={link.href}>
                        <Link href={link.href
                        }>{link.label}</Link>
                    </li>
                ))}
          </ul>
        </Flex>
)
}

const AuthState = () => {
  const { status, data: session } = useSession();
  if (status === 'loading') return <Skeleton width='3rem'/>;
  if(status === 'unauthenticated') return <Link href={'/api/auth/signin'}>Sign in</Link>
  return
        <Box>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button className='bg-inherit border-none'>
                    <Avatar src={session!.user?.image || undefined } fallback = "?" size='2' radius='full' className='cursor-pointer'/>
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size='2'>{session!.user?.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href='/api/auth/signout'>Sign out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>   
          </Box>
}