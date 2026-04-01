import { useUser } from "reactfire"

const App = () => {
     const {data} = useUser()
     console.log(data)
  return (   
    <div>
      App
    </div>
  )
}

export default App
