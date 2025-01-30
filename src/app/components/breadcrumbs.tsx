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
      <div className="breadcrumbs-container ml-[14rem] inline-block mt-4 pb-4 relative">
        <div className="breadcrumbs-wrapper h-12 shadow-xl justify-center items-center flex rounded-lg px-4 bg-white">
          <ul className="breadcrumbs text-lg font-bold">
            <Link className="hover:fill-orange-400" href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 64 64"
              >
                <path d="M 32 8 C 31.08875 8 30.178047 8.3091875 29.435547 8.9296875 L 8.8007812 26.171875 C 8.0357812 26.810875 7.7634844 27.925203 8.2714844 28.783203 C 8.9184844 29.875203 10.35025 30.088547 11.28125 29.310547 L 12 28.710938 L 12 47 C 12 49.761 14.239 52 17 52 L 47 52 C 49.761 52 52 49.761 52 47 L 52 28.712891 L 52.71875 29.3125 C 53.09275 29.6255 53.546047 29.777344 53.998047 29.777344 C 54.693047 29.777344 55.382672 29.416656 55.763672 28.722656 C 56.228672 27.874656 55.954891 26.803594 55.212891 26.183594 L 52 23.498047 L 52 15 C 52 13.895 51.105 13 50 13 L 48 13 C 46.895 13 46 13.895 46 15 L 46 18.484375 L 34.564453 8.9296875 C 33.821953 8.3091875 32.91125 8 32 8 z M 32 12.152344 C 32.11475 12.152344 32.228766 12.191531 32.322266 12.269531 L 48 25.369141 L 48 46 C 48 47.105 47.105 48 46 48 L 38 48 L 38 34 C 38 32.895 37.105 32 36 32 L 28 32 C 26.895 32 26 32.895 26 34 L 26 48 L 18 48 C 16.895 48 16 47.105 16 46 L 16 25.367188 L 31.677734 12.269531 C 31.771234 12.191531 31.88525 12.152344 32 12.152344 z"></path>
              </svg>
            </Link>
            <span className="breadcrumb-separator">{"▶"}</span>
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
