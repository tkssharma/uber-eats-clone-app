import Header from "../../../auth/Header"
import Login from "../../../auth/login"
export default async function LoginPage() {

  return (
    <>
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />
      <Login />
    </>
  )
}