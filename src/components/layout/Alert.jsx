import { useContext } from "react"
import AlertContext from "../../context/alert/AlertContext"

const Alert = () => {
  const {alert} = useContext(AlertContext)

  return (
    alert !== null && (
      <p className="flex items-start mb-4 space-x-2">
        {alert.type === 'err' && (
          <strong>{alert.msg}</strong>
        )}
      </p>
    )
  )
}

export default Alert