import { Navigate } from "react-router-dom"

export default function ServicesPage() {
  // Redirect to AI Trading page
  return <Navigate to="/services/ai-trading" replace />
}
