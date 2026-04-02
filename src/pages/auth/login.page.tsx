import { useAuthActions } from "../../hooks/use-auth-actions"

const LoginPage = () => {
  const {loginWithGoogle,loading} = useAuthActions()
  const handleLoginWithGoogle = async () => {
   const result =  await loginWithGoogle()
   if (result.success) {
    console.log("Login Correcto")
   } else {
    console.log("Login Fallido", result.error)
   }
  }
  return (
    <div>
      <button
        onClick={handleLoginWithGoogle}
      >
       { loading ? "Iniciando Sesion" : "Iniciar Con Google"}
      </button>
    </div>
  )
}
export default LoginPage
