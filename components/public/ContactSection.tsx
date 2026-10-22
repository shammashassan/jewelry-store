"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import type { Settings } from "@/lib/getSettings";

import { contactContent, siteConfig } from "@/lib/data"

export function ContactSection({ settings }: { settings: Settings }) {
  const { heading, subheading, hours } = contactContent
  const address = siteConfig.address
  const phone = siteConfig.phone
  const email = siteConfig.email

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: email !== "Not configured" ? `mailto:${email}` : "#",
    },
    {
      icon: Phone,
      label: "Phone",
      value: phone,
      href: phone !== "Not configured" ? `tel:${phone}` : "#",
    },
    {
      icon: MapPin,
      label: "Location",
      value: address,
      href: "#",
    },
  ];

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-background px-4 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>

      <div className="mx-auto w-full max-w-6xl relative">

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 relative">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="relative overflow-hidden rounded-xl border border-border/40 bg-background/60 p-6 backdrop-blur-sm sm:p-8">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-50" />
              <form className="relative z-10 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-background/50 transition-colors focus:bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-background/50 transition-colors focus:bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="How can I help you?"
                    className="bg-background/50 transition-colors focus:bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="resize-none bg-background/50 transition-colors focus:bg-background"
                  />
                </div>

                <Button type="submit" className="w-full gap-2 text-base">
                  Send Message
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-6 lg:space-y-8 relative">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 relative">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  <Card className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/60 p-4 transition-all duration-300 hover:border-foreground/20 hover:shadow-md hover:-translate-y-1 backdrop-blur-sm sm:p-6">
                    <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <a
                      href={info.href}
                      className="relative z-10 flex items-center gap-4"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <info.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">
                          {info.label}
                        </h3>
                        <p className="text-sm text-muted-foreground transition-colors group-hover:text-foreground/80">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>

            {hours.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Card className="rounded-xl border border-border/40 bg-background/60 p-6 backdrop-blur-sm sm:p-8">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    Working Hours
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground sm:text-base">
                    {hours.map((h, i) => (
                      <div key={i} className="flex justify-between border-b border-border/40 last:border-0 pb-2 last:pb-0">
                        <span>{h.day}</span>
                        <span className="font-medium text-foreground">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}