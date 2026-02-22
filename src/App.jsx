import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Income from "./pages/Income.jsx";
import Expense from "./pages/Expense.jsx";
import Category from "./pages/Category.jsx";
import Filter from "./pages/Filter.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import {Toaster} from "react-hot-toast";
import LandingPage from "./pages/LandingPage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Lend from "./pages/Lend.jsx";
import Borrow from "./pages/Borrow.jsx";
import Budgets from "./pages/Budgets.jsx";
import Recurring from "./pages/Recurring.jsx";
import Savings from "./pages/Savings.jsx";
import Investments from "./pages/Investments.jsx";
import Debts from "./pages/Debts.jsx";
import Analytics from "./pages/Analytics.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/guards/ProtectedRoute.jsx";
import ErrorBoundary from "./components/ui/ErrorBoundary.jsx";

const App = () => {
    return (
        <ErrorBoundary>
            <Toaster />
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
    return isAuthenticated ? (
        <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/home" />
    );
}

export default App;
