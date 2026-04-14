import LogoComponent from "@/components/auth/logo.component"
import { Navigate, Outlet } from "react-router"
import { useSigninCheck } from "reactfire"
import logo from "@/assets/CobraYa_Logo.png";
const AuthLayout = () => {
  const {status, data:signInCheckResult, hasEmitted} = useSigninCheck()
  if (status === "loading" || !hasEmitted){
    return <div>Loading ...</div>
  }

  if (status === "success" && signInCheckResult.signedIn) {
    return(
      <Navigate
        to={"/admin"}
        replace
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50" >
      <LogoComponent src={logo}/>      
      <div className="max-w-md w-full ">        
        <Outlet/>
      </div>      
    </div>
  )
}

export default AuthLayout
