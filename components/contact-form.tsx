"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [resultMessage, setResultMessage] = useState("")
  const [resultStatus, setResultStatus] = useState<"success" | "error" | "">("")
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, topic: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!formRef.current?.checkValidity()) {
      e.stopPropagation()
      const invalidField = formRef.current?.querySelector(":invalid") as HTMLElement
      if (invalidField) invalidField.focus()
      return
    }

    setIsSubmitting(true)
    setResultMessage("Please wait...")
    setResultStatus("")

    try {
      // Prepare form data for submission
      const formData = {
        ...formState,
        access_key: "e20a5f1e-fad7-49c4-8390-7a368d016555", // Your web3forms public key
        from_name: "Spark AI Studios Contact Form",
        subject: `New contact from ${formState.name} about ${formState.topic}`,
      }

      // Submit to web3forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.status === 200) {
        setResultMessage(data.message)
        setResultStatus("success")
        setIsSubmitted(true)

        // Reset form after successful submission
        setFormState({
          name: "",
          email: "",
          topic: "",
          message: "",
        })
      } else {
        setResultMessage(data.message || "Something went wrong!")
        setResultStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setResultMessage("Something went wrong! Please try again later.")
      setResultStatus("error")
    } finally {
      setIsSubmitting(false)

      // Hide the result message after 5 seconds
      if (resultStatus === "success") {
        setTimeout(() => {
          setResultMessage("")
          setResultStatus("")
        }, 5000)
      }
    }
  }

  return (
    <section id="contact" className="py-12 px-6 md:px-12 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Get in Touch
            </span>
          </h2>

          <div className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-10 rounded-xl border border-gray-700 shadow-xl">
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-6">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300">
                  {resultMessage || "Thank you for reaching out. We'll get back to you soon."}
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 needs-validation" noValidate>
                {resultMessage && (
                  <div
                    className={`p-4 rounded-md mb-4 ${
                      resultStatus === "success"
                        ? "bg-green-500/20 text-green-500"
                        : resultStatus === "error"
                          ? "bg-red-500/20 text-red-500"
                          : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {resultMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-gray-300">
                    I'm reaching out about...
                  </Label>
                  <Select value={formState.topic} onValueChange={handleSelectChange} required>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="collaboration">Collaboration</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    required
                    className="min-h-[120px] bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-6"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
