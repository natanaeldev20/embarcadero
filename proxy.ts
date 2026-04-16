// import NextAuth from "next-auth";
// import authConfig from "./auth.config";

import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/panel");

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/iniciar-sesion", req.nextUrl));
  }
});

// const protectedRoutes = ["/dashboard", "/profile", "/admin"];

// const isProtectedRoute = protectedRoutes.some((route) =>
//   req.nextUrl.pathname.startsWith(route)
// );

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};

// //Para no volver a login
// if (!isProtectedRoute && isLoggedIn && req.nextUrl.pathname === "/login") {
//   return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
// }

// export default auth((req) => {
//   const isLoggedIn = !!req.auth;
//   const isProtectedRoute = req.nextUrl.pathname.startsWith("/panel");

//   if (isProtectedRoute && !isLoggedIn) {
//     return NextResponse.redirect(new URL("/iniciar-sesion", req.nextUrl));
//   }
// });
// export default auth;
