import { useState } from "react";
import toast from "react-hot-toast";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/ui/Button.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { getErrorMessage } from "../util/errorUtils.js";
import { validateEmail } from "../util/validation.js";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!validateEmail(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (form.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.CONTACT_US, form);
      if (response.status === 201) {
        toast.success("Message submitted successfully. We will contact you soon.");
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-14 md:py-20">
        <div className="max-w-2xl mx-auto card">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 mt-2">Need help or have a suggestion? Send us a message and our team will get back shortly.</p>

          <form className="mt-8" onSubmit={handleSubmit}>
            <Input label="Full Name" value={form.name} onChange={({ target }) => handleChange("name", target.value)} required />
            <Input label="Email Address" type="email" value={form.email} onChange={({ target }) => handleChange("email", target.value)} required />
            <Input label="Subject" value={form.subject} onChange={({ target }) => handleChange("subject", target.value)} placeholder="Optional" />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
              <textarea
                value={form.message}
                onChange={({ target }) => handleChange("message", target.value)}
                rows={5}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white"
                placeholder="Tell us how we can help..."
              />
            </div>

            <Button type="submit" isLoading={loading} loadingText="Sending message...">
              Submit Message
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
