import { Route, Routes } from "react-router-dom"
import TransactionPage from "./pages/TransactionPage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import Header from "./components/ui/Header"


function App() {

  const authUser=true;
  return (
    <>
    {authUser &&<Header/>}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="transaction" element={<TransactionPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

    </>
  )
}

export default App
