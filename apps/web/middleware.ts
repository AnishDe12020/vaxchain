export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/new-batch",
    "/dashboard/airdrop",
    "/dashboard/buy",
    "/dashboard/batch/:path*",
  ],
}
