// // utilities/isAuthentificated.ts
// import jwt from 'jsonwebtoken';
// import { cookies } from 'next/headers';

// export async function checkAuth():Promise<boolean> {
//   const cookieStore = cookies();
//   const token = cookieStore.get('token')?.value // Replace 'connect.sid' with your session cookie name if different

//   let isAuthenticated=false;

//   if (token) {
//     try {
//       jwt.verify(token, process.env.JWT_SECRET as string);
//       isAuthenticated = true;
//     } catch (err) {
//       return false;
//     }
//   }
//   return isAuthenticated;
// }


