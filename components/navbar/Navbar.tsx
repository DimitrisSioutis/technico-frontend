"use client"
import { usePathname } from 'next/navigation';  // Import from next/navigation
import Link from "next/link";
import Logo from "./Logo";
import Avatar from "../ui/avatar";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

const Navbar = () => {

  const pathname = usePathname(); 

  const links = [
    { href: "/", name: "Home" },
    { href: "/services", name: "Services" },
    { href: "/about", name: "About" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[rgb(24,24,27)] text-white">
      <Logo fill={"white"} height={"50"} width={"175"}/>

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="flex space-x-6">
          {links.map((link, index) => {
            const isActive = pathname === link.href 

            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild >
                  <Link
                    className={isActive? "text-slate-400" : "text-slate-50"}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Login Button */}
      <Link href={'/login'}>
      <Button variant="default">
        <Avatar />
         Login
      </Button>
      </Link>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button variant="ghost" className="text-white" id="menu-toggle">
          ☰
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
