import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import ServiceDetailPage from "./pages/ServiceDetailPage"
import ContactPage from "./pages/ContactPage"
import KycPage from "./pages/KycPage"
import BlogsPage from "./pages/BlogsPage"
import BlogDetailPage from "./pages/BlogDetailPage"
import CareersPage from "./pages/CareersPage"
import AdminPage from "./pages/AdminPage"
import AdminDashboardPage from "./pages/AdminDashboardPage"
import AdminContactsPage from "./pages/AdminContactsPage"
import AdminKycPage from "./pages/AdminKycPage"
import AdminBlogsPage from "./pages/AdminBlogsPage"
import AdminCareersPage from "./pages/AdminCareersPage"
import AdminApplicantsPage from "./pages/AdminApplicantsPage"
import GetStartedPage from "./pages/GetStartedPage"
import PaymentPage from "./pages/PaymentPage"
import ThankYouPage from "./pages/ThankYouPage"
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage"
import { useLocation } from "react-router-dom"

function App() {
  const [showFooter, setShowFooter] = useState(true)
  const location = useLocation()

  // Hide footer on privacy policy page since it has its own custom footer section
  const shouldShowGlobalFooter = showFooter && location.pathname !== '/privacy-policy'

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/kyc" element={<KycPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/careers" element={<CareersPage setShowFooter={setShowFooter} />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/contacts" element={<AdminContactsPage />} />
          <Route path="/admin/kyc" element={<AdminKycPage />} />
          <Route path="/admin/blogs" element={<AdminBlogsPage />} />
          <Route path="/admin/careers" element={<AdminCareersPage />} />
          <Route path="/admin/applicants" element={<AdminApplicantsPage />} />
          
          <Route path="/get-started" element={<GetStartedPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {shouldShowGlobalFooter && <Footer />}
      <Toaster position="top-right" richColors />
    </>
  )
}

export default App
