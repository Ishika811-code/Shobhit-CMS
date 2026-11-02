import { useEffect } from 'react'
import LoginPage from './features/auth/login.jsx'
import PasswordRecoveryPage from './features/auth/PasswordRecoveryPage.jsx'

function App() {
  const isPasswordRecovery = window.location.pathname === "/forgot-password"

  useEffect(() => {
    document.title = isPasswordRecovery
      ? "Password Recovery | Shobhit University"
      : "Shobhit University | Institutional Sign In"
  }, [isPasswordRecovery])

  return isPasswordRecovery
    ? <PasswordRecoveryPage />
    : <LoginPage />
}

export default App
