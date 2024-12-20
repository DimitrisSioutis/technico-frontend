import React from 'react'
import Link from 'next/link'

const MobileMenu = () => {
  return (
    <ul
    id="mobile-menu"
    className="hidden absolute top-16 left-0 w-full bg-gray-800 text-center space-y-4 md:hidden"
  >
        <li>
        <Link href="/" className="block py-2 hover:text-green-400">
            Home
        </Link>
        </li>
        <li>
        <Link href="/services" className="block py-2 hover:text-green-400">
            Services
        </Link>
        </li>
        <li>
        <Link href="/about" className="block py-2 hover:text-green-400">
            About
        </Link>
        </li>
    </ul>
  )
}

export default MobileMenu