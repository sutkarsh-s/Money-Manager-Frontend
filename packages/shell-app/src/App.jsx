import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary, ProtectedRoute } from "@mm/shared";

import { LandingPage, Login, Signup, About, Contact } from "@mm/mfe-auth";
import { Home, Analytics } from "@mm/mfe-analytics";
import { Income, Expense, Category, Filter, Recurring } from "@mm/mfe-transactions";
import { Budgets, Savings, Debts } from "@mm/mfe-planning";
import { Investments } from "@mm/mfe-investments";
import { Lend, Borrow } from "@mm/mfe-lending";
import { Profile } from "@mm/mfe-profile";

const App = () => {
    return (
        <ErrorBoundary>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    success: { duration: 3000 },
                    error: { duration: 5000 },
                    style: {
                        fontSize: '14px',
                        maxWidth: '400px',
                    },
                }}
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
                    <Route path="/expense" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
                    <Route path="/lend" element={<ProtectedRoute><Lend /></ProtectedRoute>} />
                    <Route path="/borrow" element={<ProtectedRoute><Borrow /></ProtectedRoute>} />
                    <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
                    <Route path="/filter" element={<ProtectedRoute><Filter /></ProtectedRoute>} />
                    <Route path="/budgets" element={<ProtectedRoute><Budgets /></ProtectedRoute>} />
                    <Route path="/recurring" element={<ProtectedRoute><Recurring /></ProtectedRoute>} />
                    <Route path="/savings" element={<ProtectedRoute><Savings /></ProtectedRoute>} />
                    <Route path="/investments" element={<ProtectedRoute><Investments /></ProtectedRoute>} />
                    <Route path="/debts" element={<ProtectedRoute><Debts /></ProtectedRoute>} />
                    <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    )
}

const Root = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/home" />;
}

export default App;
