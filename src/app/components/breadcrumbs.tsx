"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const BreadcrumbsArray = pathname.split("/");
  BreadcrumbsArray.shift();

  if (pathname === "/") {
    return null;
  }

  return (
    <>
      <div className="breadcrumbs-container ml-[14rem] inline-block mt-4 pb-4">
        <div className="breadcrumbs-wrapper h-12 shadow-xl justify-center items-center flex rounded-lg px-4 bg-white">
          <ul className="breadcrumbs text-lg font-bold">
            {BreadcrumbsArray.map((item, index) => (
              <li key={index} className="mr relative">
                <Link
                  className="hover:text-orange-400"
                  href={"/" + BreadcrumbsArray.slice(0, index + 1).join("/")}
                >
                  {item}
                </Link>
                {index < BreadcrumbsArray.length - 1 && (
                  <span className="breadcrumb-separator pl-3">{"▶"}</span>
                )}
                <div className="breadcrumb-background absolute bottom-0 left-0 w-full h-1"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <br />
    </>
  );
}
