import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full h-[75px] flex items-center border-b px-4 md:px-12">
      <nav className="w-full flex justify-between items-center">
        <div className="logo">
          <Link href={"/"}>
            <Image src={"/asset/smit.png"} alt="Logo" width={80} height={80} priority />
          </Link>
        </div>
        <div className="menu">
          <div className="md:hidden">
            <Menu className="w-6 h-6" />
          </div>
          <div className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li className="text-gray-400">
                <Link href={"/courses"}>Courses</Link>
              </li>
              <li>
                <Link href={'/user/login'}>
                  <Button size={"sm"}>Login</Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
