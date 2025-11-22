import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    // Récupérer la session utilisateur
    const { data: { session } } = await supabase.auth.getSession()
    
    // Si l'utilisateur est connecté mais n'a pas vérifié son email
    if (session && !session.user.email_confirmed_at) {
        // Autoriser l'accès aux pages de vérification et d'authentification
        if (
            request.nextUrl.pathname.startsWith('/verify') ||
            request.nextUrl.pathname.startsWith('/auth') ||
            request.nextUrl.pathname === '/login' ||
            request.nextUrl.pathname === '/register' ||
            request.nextUrl.pathname === '/'
        ) {
            return response
        }
        
        // Rediriger vers la page de vérification
        const verifyUrl = new URL('/verify', request.url)
        return NextResponse.redirect(verifyUrl)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - api (API routes)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|api|public).*)',
    ],
}
