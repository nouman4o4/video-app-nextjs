"use client"
import React, { useState } from "react"
import { Camera, X, ChevronLeft, Check, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function EditProfile() {
  const [formData, setFormData] = useState({
    firstName: "Jane",
    lastName: "Doe",
    about:
      "Digital creator, travel enthusiast, and coffee lover ☕ | Sharing ideas for home, fashion & lifestyle | DM for collabs",
    website: "https://janedoe.com",
    username: "janedoe",
    location: "San Francisco, CA",
    pronouns: "she/her",
  })

  const [charCount, setCharCount] = useState(formData.about.length)
  const router = useRouter()
  const maxChars = 500

  const handleChange = (field: any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === "about") {
      setCharCount(value.length)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Edit profile
              </h1>
              <p className="text-sm text-gray-600">Keep your profile updated</p>
            </div>
          </div>
          <button className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition shadow-sm">
            Save
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Photo Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Profile photo
          </h2>

          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                JD
              </div>
              <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition shadow-md">
                <Camera className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <div className="flex-1 pt-2">
              <p className="text-gray-700 mb-4">
                Use a photo that clearly shows your face. You can also upload a
                logo or brand image.
              </p>
              <div className="flex items-center space-x-3">
                <button className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-full transition text-sm">
                  Upload photo
                </button>
                <button className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 font-medium rounded-full transition text-sm">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Basic information
          </h2>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="First name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pronouns
              </label>
              <select
                value={formData.pronouns}
                onChange={(e) => handleChange("pronouns", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition appearance-none bg-white"
              >
                <option value="">Select pronouns</option>
                <option value="she/her">she/her</option>
                <option value="he/him">he/him</option>
                <option value="they/them">they/them</option>
                <option value="custom">Custom</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                About
              </label>
              <textarea
                rows={5}
                value={formData.about}
                onChange={(e) => handleChange("about", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition"
                placeholder="Tell people a bit about yourself..."
                maxLength={maxChars}
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">
                  Tell people about yourself, what you love, and what inspires
                  you
                </p>
                <span
                  className={`text-xs font-medium ${
                    charCount > maxChars - 50 ? "text-red-600" : "text-gray-500"
                  }`}
                >
                  {charCount}/{maxChars}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Online Presence */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Online presence
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Add links to your website and social profiles
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="username"
                />
                <div className="absolute right-4 top-3.5">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                pinterest.com/{formData.username}
              </p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Location</h2>
          <p className="text-sm text-gray-600 mb-6">
            Let people know where you're from
          </p>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              placeholder="City, State/Country"
            />
          </div>
        </div>

        {/* Account Management */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Account management
          </h2>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition border border-gray-200">
              <div className="text-left">
                <p className="font-semibold text-gray-900">Account settings</p>
                <p className="text-sm text-gray-600">
                  Update email, password and privacy settings
                </p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition border border-gray-200">
              <div className="text-left">
                <p className="font-semibold text-gray-900">Claimed accounts</p>
                <p className="text-sm text-gray-600">
                  Verify your website and social accounts
                </p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition border border-gray-200">
              <div className="text-left">
                <p className="font-semibold text-gray-900">Branded content</p>
                <p className="text-sm text-gray-600">
                  Disclose paid partnerships
                </p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-3xl shadow-sm border border-red-200 p-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Delete account
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Permanently delete your account and all of your content. This
                action cannot be undone.
              </p>
              <button className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-full transition text-sm">
                Delete account
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-8 pb-8">
          <button className="px-6 py-3 text-gray-700 hover:bg-white hover:shadow-sm font-semibold rounded-full transition border border-gray-300">
            Cancel
          </button>
          <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition shadow-sm">
            Save changes
          </button>
        </div>
      </div>
    </div>
  )
}
