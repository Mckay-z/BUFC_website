"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiX, FiSearch, FiChevronDown, FiLogIn } from "react-icons/fi";
import Button from "../ui/Button";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";

import { useUI } from "@/context/UIContext";

export default function Navbar() {
  const { openAuthModal } = useUI();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const webScroll = () => {
    const scrolled = window.scrollY;
    setIsScrolled(scrolled > 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", webScroll);
    return () => {
      window.removeEventListener("scroll", webScroll);
    };
  }, [isScrolled]);

  // Disable body scroll when sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const desktopNavLinks = [
    { href: "/news", icon: "mdi:newspaper", name: "News" },
    { href: "/fixtures", icon: "mdi:calendar", name: "Fixtures" },
    { href: "/clubs", icon: "mdi:account-group", name: "Club Profile" },
    { href: "/players", icon: "mdi:account", name: "Players" },
  ];
  const sideMenuTabs = [
    {
      href: "/shop",
      icon: "mdi:cart",
      name: "Shop",
    },
    {
      href: "/community",
      icon: "fluent:people-community-12-filled",
      name: "Community",
    },
    {
      href: "/gallery",
      icon: "material-symbols:gallery-thumbnail-rounded",
      name: "Gallery",
    },
    {
      href: "/contact",
      icon: "ic:round-contacts",
      name: "Contact",
    },
    {
      href: "/pastHighlights",
      icon: "bxs:videos",
      name: "Past Highlights",
    },
  ];

  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && router) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setOpen(false); // Close sidebar on redirect
      setSearchQuery(""); // Clear search
    }
  };

  return (
    <main className="fixed top-0 left-0 w-full z-50">
      <header
        className={`w-full ${isScrolled ? "bg-neutral-1/80 backdrop-blur-md" : "bg-neutral-1"}`}
      >
        <nav className="container-wide max-w-360 h-full mx-auto flex items-center justify-between py-2.5 sm:py-3 md:py-3.5 lg:py-4">
          {/* Left: Menu + Links */}
          <div className="flex items-center gap-8">
            {/* Mobile Menu Icon */}
            <Image
              src="/svg/menu.svg"
              alt="Bechem United FC"
              width={40}
              height={40}
              className="cursor-pointer w-7 md:w-9 hover:scale-105 transition ease-in-out duration-300"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            />

            {/* Desktop Links */}
            <ul className="hidden lg:flex items-center gap-7 text-[15px] ">
              {desktopNavLinks.map((link, index) => {
                const isActive = isActiveLink(link.href);
                return (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={` transition-colors duration-300 ease-in-out font-medium ${isActive
                        ? "pb-1 border-b-2 border-primary text-primary "
                        : " text-neutral-9 hover:text-primary"
                        }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Center: Logo */}
          <Link
            href="/"
            className="hidden xs:flex absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src="/img/bufc_logo.png"
              alt="Bechem United FC"
              width={200}
              height={200}
              className="w-9 xs:w-10 lg:w-11 object-center object-contain"
              priority
              unoptimized
            />
          </Link>

          {/*  */}

          <Link href="/" className="xs:hidden translate-x-1/2">
            <Image
              src="/img/bufc_logo.png"
              alt="Bechem United FC"
              width={200}
              height={200}
              className="w-9 xs:w-10 lg:w-11 object-center object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Right: Sign In */}
          <Button
            size="md"
            type="button"
            onClick={openAuthModal}
            rightIcon={<FiLogIn size="16" />}
          >
            Sign In
          </Button>
        </nav>
      </header>

      {/* Sidebar Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 "
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-72  md:w-85 xl:w-90 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-5 md:p-6 border-b border-neutral-3">
            <div className="flex items-center justify-between mb-6">
              {/* Club Info */}
              <Link href="/" onClick={() => setOpen(false)}>
                <div className="flex-center gap-3">
                  <Image
                    src="/img/bufc_logo.png"
                    alt="Bechem United FC"
                    width={200}
                    height={200}
                    className="w-6 md:8 object-contain"
                    unoptimized
                  />
                  <span className="text-sm md:text-base font-semibold text-neutral-9">
                    Bechem United FC
                  </span>
                </div>
              </Link>

              <button
                onClick={() => setOpen(false)}
                className="text-neutral-7 hover:text-neutral-text cursor-pointer transition-colors ease-in-out duration-300"
                aria-label="Close menu"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <FiSearch
                className={`absolute left-3 top-1/2 -translate-y-1/2  ${isSearchInputFocused ? "text-primary" : "text-neutral-6"}`}
                size={18}
              />
              <input
                type="text"
                placeholder="Search news, players, kits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchInputFocused(true)}
                onBlur={() => setIsSearchInputFocused(false)}
                className="w-full pl-10 pr-4 py-2.5 md:py-3  placeholder:text-neutral-5 text-neutral-9 bg-transparent border border-neutral-5 focus:border-primary rounded-xl text-base focus:outline-none transition-colors duration-300 ease-in-out"
              />
            </form>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto scrollbar-hide py-4">
            <ul className="space-y-2 lg:space-y-3 px-3">
              {desktopNavLinks.map((tab, index) => {
                const isActive = isActiveLink(tab.href);
                return (
                  <li key={index} className="lg:hidden">
                    <Link
                      href={tab.href}
                      className={`flex items-center justify-between  px-4 py-3.5  ${isActive ? "bg-primary-hover text-prim-1" : "bg-transparent hover:bg-slate-50 text-neutral-text"} rounded-lg transition-colors duration-300 ease-in-out`}
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex-center gap-3">
                        <Icon
                          icon={tab.icon}
                          width="none"
                          height="none"
                          className="w-5 h-5 lg:w-5.5 lg:h-5.5"
                        />
                        <span className="capitalize text-base lg:text-lg ">
                          {tab.name}
                        </span>
                      </div>

                      {isActive && <FiChevronDown size={22} />}
                    </Link>
                  </li>
                );
              })}
              {sideMenuTabs.map((tab, index) => {
                const isActive = isActiveLink(tab.href);
                return (
                  <li key={index}>
                    <Link
                      href={tab.href}
                      className={`flex items-center justify-between  px-4 py-3.5  ${isActive ? "bg-primary-hover text-prim-1" : "bg-transparent hover:bg-slate-50 text-neutral-text"} rounded-lg transition-colors duration-300 ease-in-out`}
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex-center gap-3">
                        <Icon
                          icon={tab.icon}
                          width="none"
                          height="none"
                          className="w-5 h-5 lg:w-5.5 lg:h-5.5"
                        />
                        <span className="capitalize text-base lg:text-lg ">
                          {tab.name}
                        </span>
                      </div>

                      {isActive && <FiChevronDown size={22} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </main>
  );
}
