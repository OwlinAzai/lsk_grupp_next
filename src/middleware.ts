import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { subdomains } from './subdomain'; 


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const subdomainsObject: String[] = subdomains;
    const url = new URL(request.url);
    const hostName = request.headers.get('host') || "";
    if(hostName.endsWith(process.env.APP_BASE_DOMAIN!)){
        const urlParts = url.pathname.split('/').filter(part => part != "");
        if(urlParts[0] == 'subdomains'){
            return NextResponse.error();
        }
        const subdomainsInUrl = hostName.split(".");
        if(subdomainsInUrl.length > 1){
            const subdomain = subdomainsInUrl[0];
            if(subdomain != ""){
                if(subdomainsObject.indexOf(subdomain) >= -1){
                    return NextResponse.rewrite(new URL(`/subdomains/${subdomain}${url.pathname}`, request.url));
                }
                else{
                    return NextResponse.error();
                }
            }
            return NextResponse.next();
        }
        return NextResponse.next();
    }
    else{
        return NextResponse.error();
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}
