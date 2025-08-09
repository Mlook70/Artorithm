"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const faqData = [
  {
    question: "What is ARTORITHM and what services do you offer?",
    answer:
      "ARTORITHM is a leading digital transformation company that helps businesses modernize their operations through comprehensive technology solutions. We offer digital transformation strategy, custom application development, enterprise integration, cloud migration, AI implementation, and ongoing consulting support.",
  },
  {
    question: "How long does a typical digital transformation project take?",
    answer:
      "Project timelines vary based on scope and complexity. A basic digital transformation assessment typically takes 4-6 weeks, while comprehensive transformation programs can range from 6-18 months. We work closely with your team to create realistic timelines and deliver value incrementally throughout the process.",
  },
  {
    question: "Can ARTORITHM work with our existing technology stack?",
    answer:
      "Absolutely! We specialize in integrating with existing systems and technology stacks. Our team conducts a thorough assessment of your current infrastructure and creates a transformation strategy that builds upon your existing investments while modernizing and optimizing your technology ecosystem.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We serve businesses across various industries including healthcare, finance, manufacturing, retail, and professional services. Our digital transformation expertise is applicable to any industry looking to modernize operations, improve efficiency, and drive growth through technology.",
  },
  {
    question: "Do you provide ongoing support after implementation?",
    answer:
      "Yes, we offer comprehensive ongoing support and maintenance services. This includes technical support, system monitoring, performance optimization, training for your team, and continuous improvement initiatives to ensure your digital transformation continues to deliver value.",
  },
  {
    question: "How do you ensure the security of our data during transformation?",
    answer:
      "Security is our top priority. We implement enterprise-grade security measures including end-to-end encryption, secure data transmission protocols, and compliance with industry standards. Our team follows strict security practices and can provide on-premises solutions when required for sensitive data.",
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}

const FAQItem = ({ question, answer, isOpen, onToggle, index }: FAQItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggle()
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`w-full bg-[rgba(231,236,235,0.08)] shadow-[0px_2px_4px_rgba(0,0,0,0.16)] overflow-hidden rounded-[10px] outline outline-1 outline-border outline-offset-[-1px] cursor-pointer hover:bg-[rgba(231,236,235,0.12)] transition-colors duration-300`}
      onClick={handleClick}
    >
      <div className="w-full px-5 py-[18px] pr-4 flex justify-between items-center gap-5 text-left">
        <div className="flex-1 text-foreground text-base font-medium leading-6 break-words">{question}</div>
        <div className="flex justify-center items-center">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground-dark" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-[18px] pt-2">
              <div className="text-foreground/80 text-sm font-normal leading-6 break-words">{answer}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }
  
  return (
    <section className="w-full pt-[66px] pb-20 md:pb-40 px-5 relative flex flex-col justify-center items-center">
      <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] z-0" />
      <div className="self-stretch pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col justify-center items-center gap-2 relative z-10">
        <div className="flex flex-col justify-start items-center gap-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[435px] text-center text-foreground text-4xl font-semibold leading-10 break-words"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="self-stretch text-center text-muted-foreground text-sm font-medium leading-[18.20px] break-words"
          >
            Everything you need to know about ARTORITHM and how we can transform your business operations
          </motion.p>
        </div>
      </div>
      <div className="w-full max-w-[600px] pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
        {faqData.map((faq, index) => (
          <FAQItem 
            key={index} 
            {...faq} 
            isOpen={openItems.has(index)} 
            onToggle={() => toggleItem(index)}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
