import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   callbacks: {
//     authorized: async ({ req, token }) => {
//       console.log(token);
//       if (req.nextUrl.pathname.startsWith("/dashboard")) return token?.role === "USER";
//       return !!token;
//     },
//   },
// });
export const config = { matcher: ["/route"] };