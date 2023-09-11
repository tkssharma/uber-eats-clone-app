import { NextMiddleware, NextResponse } from "next/server";
import withAuthorization from "./app/middlewares/withAuthorization";

const mainMiddleware: NextMiddleware = (request) => {
  const res = NextResponse.next();
  console.log(res);
  //other middleware operations
  return res;
};
// protected dashboard routes
export default withAuthorization(mainMiddleware, ["/dashboard"]);
