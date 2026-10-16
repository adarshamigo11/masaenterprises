import { Navigate } from "react-router-dom"

export default function ServicesPage() {
  // Redirect to Software Development page
  return <Navigate to="/services/software-development" replace />
}
