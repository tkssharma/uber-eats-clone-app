import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions = (req, res) => {
  return {
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
          try {
            const response = await axios.post("/api/login", {
              username: credentials.username,
              password: credentials.password,
            });

            const cookies = response.headers["set-cookie"];

            res.setHeader("Set-Cookie", cookies);

            return response.data;
          } catch (error) {
            console.log(error);
            throw Error(error.response);
          }
        },
      }),
    ],
  };
};

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
