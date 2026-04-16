
import { useAuthActions } from "../../hooks/use-auth-actions"

const DashboardPage = () => {
  const {logout} = useAuthActions()
  
  return (
    <div>
      DashboardPage 
      <button onClick={logout}>
      salir
      </button>
    </div>
  )
}

export default DashboardPage
