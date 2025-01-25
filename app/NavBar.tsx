import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";

const NavBar = () => {
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }

    ]
  return (
      <nav className='flex space-x-6 border-b-2 mb-5 px-5 h-14 items-center'>
          <Link href={'/'}><FaBug /></Link>
          <ul className='flex space-x-6'>
              {links.map((link) => (
                  <li className='text-zinc-500 hover:text-zinc-800 transition-colors' key={link.href}>
                        <Link href={link.href
                        }>{link.label}</Link>
                    </li>
                ))}
          </ul>
    </nav>
  )
}

export default NavBar