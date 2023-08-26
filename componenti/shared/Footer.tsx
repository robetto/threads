"use client";

import { sidebarLinks } from "@/costanti/costanti";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Footer() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <section className="bottombar">
            <div className="bottombar_container">
                {sidebarLinks.map((el) => {
                    // const isActive

                    const isActive =
                        (pathname.includes(el.route) && el.route.length > 1) ||
                        pathname === el.route;

                    return (
                        <Link
                            href={el.route}
                            key={el.label}
                            className={`bottombar_link ${
                                isActive && "bg-primary-500"
                            }`}
                        >
                            <Image
                                src={el.imgURL}
                                alt={el.label}
                                width={24}
                                height={24}
                            ></Image>
                            <p className="text-subtle-medium text-light-1 max-sm:hidden">
                                {el.label.split(/\s+/)[0]}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
