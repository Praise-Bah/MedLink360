"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-700">MedLink360</h1>
          <nav className="space-x-4">
          <Link href="/auth/signin">
  <button className="px-4 py-2 bg-white border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 transition">
    Sign In
  </button>
</Link>
<Link href="/auth/signup">
  <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition">
    Sign Up
  </button>
</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-b from-blue-50 to-blue-100 pt-24 lg:pt-32 px-6 lg:px-24">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900">
            Welcome to MedLink360
          </h2>
          <p className="text-blue-800 text-lg">
            Simplifying hospital management and patient care with our innovative system.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/auth/signup"
              className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
            >
              Get Started
            </Link>
            <Link
              href="/auth/signin"
              className="px-6 py-3 bg-white border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Image Placeholder */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 relative">
          <div className="w-full h-96 bg-blue-200 rounded-tl-[60%] clip-path-[polygon(0_0,100%_0,100%_100%,0_80%)]">
            {/* Replace with your zigzag/wave image */}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-6">
        <h3 className="text-3xl font-bold text-blue-800">About Us</h3>
        <p className="text-blue-700 text-lg">
          MedLink360 is a modern hospital management system helping doctors, nurses, and patients manage healthcare efficiently. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="w-full h-64 bg-blue-100 rounded-lg">
          {/* Replace with an image */}
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-6 bg-blue-50">
        <h3 className="text-3xl font-bold text-blue-800">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="font-bold text-blue-700 mb-2">Patient Management</h4>
            <p className="text-blue-700 text-sm">Track patients, appointments, and medical history with ease.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="font-bold text-blue-700 mb-2">Doctor Scheduling</h4>
            <p className="text-blue-700 text-sm">Manage doctor shifts, availability, and patient bookings efficiently.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="font-bold text-blue-700 mb-2">Reports & Analytics</h4>
            <p className="text-blue-700 text-sm">Get real-time insights and generate reports to improve hospital operations.</p>
          </div>
        </div>
      </section>

      {/* Contact / Call to Action */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center space-y-6">
        <h3 className="text-3xl font-bold text-blue-800">Ready to get started?</h3>
        <p className="text-blue-700">Sign up today and streamline your hospital operations with MedLink360.</p>
        <Link
          href="/auth/signup"
          className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
        >
          Create Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} MedLink360. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
