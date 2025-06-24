import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const accessToken = request.cookies.get('authToken')?.value;
	const { pathname } = request.nextUrl;

	const publicPaths = ['/login'];

	const isPublicPath = publicPaths.includes(pathname);

	console.warn('accessToken', accessToken);
	console.log('accessToken', accessToken);

	if (accessToken && isPublicPath) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	if (!accessToken && !isPublicPath) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};