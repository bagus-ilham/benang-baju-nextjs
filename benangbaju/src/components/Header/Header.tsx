"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Header = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  console.log(isLogin)

  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    if (offset > 30) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, [setScrolled]);

  const handleLogOut = () => {
    const data = Cookies.remove("Authorization");
    console.log(data)
    setIsLogin(false);
    router.push("/login");
  };

  
  useEffect(() => {
    const myCookie = Cookies.get("Authorization");
    setIsLogin(!!myCookie);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [handleScroll]);
  return (
    <>
      <nav
        className={`${
          scrolled ? "bg-white sticky top-0 shadow-md z-50" : "bg-transparent"
        } w-full z-50 h-20 relative`}
      >
        <div className="app-max-width w-full">
          <div
            className={`flex justify-between align-baseline app-x-padding ${styles.mainMenu}`}
          >
            {/* Left Nav */}
            <ul className={`flex-0 lg:flex-1 flex ${styles.leftMenu}`}>
              <li>
                <Link href={`/products`}>men</Link>
              </li>
              <li>
                <Link href={`/products`}>women</Link>
              </li>
              <li>
                <Link href="/products">bags</Link>
              </li>
              <li>
                <Link href="/products">blogs</Link>
              </li>
            </ul>

            {/* Logo */}
            <div className="flex-1 flex justify-center items-center cursor-pointer">
              <div className="w-32 h-auto">
                <Link href="/">
                  <Image
                    className="justify-center w-full h-auto"
                    src="/IMG_9815.png"
                    alt="Picture of the author"
                    width={500}
                    height={100}
                  />
                </Link>
              </div>
            </div>

            {/* Right Nav */}
            <ul className={`flex-1 flex justify-end ${styles.rightMenu}`}>
              <li>
                <Link href="/example">
                  <Image
                    src="/icons/SearchIcon.svg"
                    alt="bag"
                    height={24}
                    width={24}
                  ></Image>
                </Link>
              </li>
              <li>
                {isLogin ? (
                  <>
                    <button onClick={() => handleLogOut()}>
                      <Image
                        src="/icons/LogOut.svg"
                        alt="bag"
                        height={24}
                        width={24}
                      ></Image>
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Image
                        src="/icons/UserIcon.svg"
                        alt="bag"
                        height={24}
                        width={24}
                      ></Image>
                    </Link>
                  </>
                )}
              </li>
              <li>
                <Link href="/wishlist">
                  <Image
                    src="/icons/Heart.svg"
                    alt="bag"
                    height={24}
                    width={24}
                  ></Image>
                </Link>
              </li>
              <li>
                <Link href="/example">
                  <Image
                    src="/icons/BagIcon.svg"
                    alt="bag"
                    height={24}
                    width={24}
                  ></Image>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
