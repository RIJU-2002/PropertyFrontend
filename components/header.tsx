"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Menu, X, LogOut, User as UserIcon, Mail, Phone, ShieldCheck, ChevronDown, Building2, Home, LandPlot, Warehouse, Castle, Layers, Landmark, Square, Briefcase, Store, Pencil, Check, XCircle, Loader2 } from "lucide-react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

// Residential ("Home") property types — matches the APARTMENT / VILLA / ...
// enum used across the Projects filter and SearchBar.
const RESIDENTIAL_TYPES = [
  { label: "Apartments", href: "/Projects?propertyType=APARTMENT", icon: Building2 },
  { label: "Villas", href: "/Projects?propertyType=VILLA", icon: Castle },
  { label: "Independent Houses", href: "/Projects?propertyType=INDEPENDENT_HOUSE", icon: Home },
  { label: "Builder Floors", href: "/Projects?propertyType=BUILDER_FLOOR", icon: Layers },
  { label: "Penthouses", href: "/Projects?propertyType=PENTHOUSE", icon: Landmark },
  { label: "Studios", href: "/Projects?propertyType=STUDIO", icon: Square },
  { label: "Plots", href: "/Projects?propertyType=PLOT", icon: LandPlot },
];

// Commercial property types.
const COMMERCIAL_TYPES = [
  { label: "Offices", href: "/Projects?propertyType=COMMERCIAL_OFFICE", icon: Briefcase },
  { label: "Shops", href: "/Projects?propertyType=COMMERCIAL_SHOP", icon: Store },
  { label: "Warehouses", href: "/Projects?propertyType=WAREHOUSE", icon: Warehouse },
];

import { API_BASE } from "@/lib/apiUrl"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isResidentialOpen, setIsResidentialOpen] = useState(false)
  const [isCommercialOpen, setIsCommercialOpen] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" })
  const [editError, setEditError] = useState<string | null>(null)

  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const residentialTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const commercialTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
    router.push("/")
    router.refresh()
  }

  const openUserMenu = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setIsUserMenuOpen(true)
  }

  const closeUserMenuDelayed = () => {
    closeTimeout.current = setTimeout(() => setIsUserMenuOpen(false), 150)
  }

  const openResidential = () => {
    if (residentialTimeout.current) clearTimeout(residentialTimeout.current)
    setIsCommercialOpen(false)
    setIsResidentialOpen(true)
  }

  const closeResidentialDelayed = () => {
    residentialTimeout.current = setTimeout(() => setIsResidentialOpen(false), 150)
  }

  const openCommercial = () => {
    if (commercialTimeout.current) clearTimeout(commercialTimeout.current)
    setIsResidentialOpen(false)
    setIsCommercialOpen(true)
  }

  const closeCommercialDelayed = () => {
    commercialTimeout.current = setTimeout(() => setIsCommercialOpen(false), 150)
  }

  const startEditing = () => {
    setEditForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    })
    setEditError(null)
    setIsEditingProfile(true)
  }

  const cancelEditing = () => {
    setIsEditingProfile(false)
    setEditError(null)
  }

  const saveProfile = async () => {
    setIsSaving(true);
    setEditError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editForm.name,
          email: editForm.email,
          // phone removed — not editable
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update");
      }

      // Update localStorage user data
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...storedUser, ...data.user }));

      router.refresh();
      setIsEditingProfile(false);
    } catch (err) {
      setEditError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const initials = (user?.name?.trim()?.[0] || user?.phone?.slice(-2) || "?").toUpperCase()

  const navContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const navItem = {
    hidden: { opacity: 0, y: -8 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 isolate bg-[#FAF7F2] border-b border-[#C9A84C]/25 shadow-[0_10px_40px_rgba(15,23,42,0.08)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[104px] md:h-[136px]">
          <div className="flex items-center gap-4 md:gap-6 min-w-0">
            <Link
              href="/"
              className="flex items-center shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label="Samriddh Realty home"
            >
              {/*
                Header bar is now the same cream (#FAF7F2) as the logo's own
                background, so the logo sits directly on it with no plate,
                blend-mode, or invert hack needed — the backgrounds are
                literally the same color.
              */}
              <Image
                src="/images/logo.jpeg"
                alt="Samriddh — Your Dream. Our Commitments"
                width={480}
                height={480}
                priority
                className="h-[84px] w-auto object-contain object-center transition-transform duration-300 hover:scale-[1.03] md:h-[120px]"
              />
            </Link>
            <span
              aria-hidden
              className="hidden md:block h-14 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/60 to-transparent"
            />
          </div>

          {/* Desktop Navigation */}
          <motion.nav
            variants={navContainer}
            initial="hidden"
            animate="show"
            className="hidden md:flex items-center gap-8 lg:gap-10 text-[15px] lg:text-base font-medium tracking-[0.03em]"
          >
            <motion.div variants={navItem} whileHover={{ y: -2 }}>
              <Link href="/about" className="relative text-[#0D1B2A]/70 hover:text-[#0D1B2A] transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#C9A84C] after:transition-all after:duration-300 hover:after:w-full">
                About
              </Link>
            </motion.div>
            {/* Residential (Home) properties */}
            <motion.div
              variants={navItem}
              whileHover={{ y: -2 }}
              className="relative"
              onMouseEnter={openResidential}
              onMouseLeave={closeResidentialDelayed}
            >
              <button
                className="relative flex items-center gap-1 text-[#0D1B2A]/70 hover:text-[#0D1B2A] transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#C9A84C] after:transition-all after:duration-300 hover:after:w-full"
                aria-expanded={isResidentialOpen}
              >
                Residential
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isResidentialOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isResidentialOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-2 w-60 rounded-xl border border-border bg-background shadow-[0_12px_40px_rgba(0,0,0,.12)] overflow-hidden z-50 py-2"
                  >
                    {RESIDENTIAL_TYPES.map((type) => {
                      const Icon = type.icon;
                      return (
                        <Link
                          key={type.label}
                          href={type.href}
                          onClick={() => setIsResidentialOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                        >
                          <Icon className="w-4 h-4 shrink-0 text-primary/70" />
                          {type.label}
                        </Link>
                      );
                    })}
                    <div className="mt-1 border-t border-border pt-1">
                      <Link
                        href="/Projects"
                        onClick={() => setIsResidentialOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#0D1B2A] hover:bg-primary/10 transition-colors"
                      >
                        View All Projects
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Commercial properties */}
            <motion.div
              variants={navItem}
              whileHover={{ y: -2 }}
              className="relative"
              onMouseEnter={openCommercial}
              onMouseLeave={closeCommercialDelayed}
            >
              <button
                className="relative flex items-center gap-1 text-[#0D1B2A]/70 hover:text-[#0D1B2A] transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#C9A84C] after:transition-all after:duration-300 hover:after:w-full"
                aria-expanded={isCommercialOpen}
              >
                Commercial
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isCommercialOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isCommercialOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-border bg-background shadow-[0_12px_40px_rgba(0,0,0,.12)] overflow-hidden z-50 py-2"
                  >
                    {COMMERCIAL_TYPES.map((type) => {
                      const Icon = type.icon;
                      return (
                        <Link
                          key={type.label}
                          href={type.href}
                          onClick={() => setIsCommercialOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                        >
                          <Icon className="w-4 h-4 shrink-0 text-primary/70" />
                          {type.label}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div variants={navItem} whileHover={{ y: -2 }}>
              <Link href="/roi" className="relative text-[#0D1B2A]/70 hover:text-[#0D1B2A] transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#C9A84C] after:transition-all after:duration-300 hover:after:w-full">
                Return on Investment
              </Link>
            </motion.div>
            <motion.div variants={navItem} whileHover={{ y: -2 }}>
              <Link href="/blog" className="relative text-[#0D1B2A]/70 hover:text-[#0D1B2A] transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#C9A84C] after:transition-all after:duration-300 hover:after:w-full">
                Blogs
              </Link>
            </motion.div>
          </motion.nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />

            {isAuthenticated ? (
              <div
                className="relative"
                onMouseEnter={openUserMenu}
                onMouseLeave={closeUserMenuDelayed}
              >
                <button
                  className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 text-[#0D1B2A]/70 hover:text-[#0D1B2A] hover:bg-[#0D1B2A]/5 transition-colors duration-300"
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen}
                >
                  {user?.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user?.name || "Profile"}
                      width={32}
                      height={32}
                      className="rounded-full object-cover w-8 h-8"
                    />
                  ) : (
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/15 text-primary text-sm font-semibold">
                      {initials}
                    </span>
                  )}
                  <span className="text-sm font-medium max-w-[100px] truncate">
                    {user?.name || user?.phone}
                  </span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-background shadow-[0_12px_40px_rgba(0,0,0,.12)] overflow-hidden z-50"
                    >
                      {/* ─── Profile Header ─── */}
                      <div className="flex items-center gap-3 p-4 bg-primary/5 border-b border-border">
                        {user?.avatarUrl ? (
                          <Image
                            src={user.avatarUrl}
                            alt={user?.name || "Profile"}
                            width={44}
                            height={44}
                            className="rounded-full object-cover w-11 h-11"
                          />
                        ) : (
                          <span className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/15 text-primary text-base font-semibold">
                            {initials}
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {user?.name || "Unnamed User"}
                          </p>
                          {user?.role && (
                            <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wide text-primary">
                              <ShieldCheck className="w-3 h-3" />
                              {user.role}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* ─── Edit Mode ─── */}
                      <AnimatePresence mode="wait">
                        {isEditingProfile ? (
                          <motion.div
                            key="edit-form"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 space-y-3"
                          >
                            <div className="space-y-1.5">
                              <Label className="text-xs text-muted-foreground">Name</Label>
                              <Input
                                value={editForm.name}
                                onChange={(e) => setEditForm(f => ({ ...f, name: e.target.value }))}
                                placeholder="Your name"
                                className="h-9 text-sm"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs text-muted-foreground">Email</Label>
                              <Input
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm(f => ({ ...f, email: e.target.value }))}
                                placeholder="you@example.com"
                                className="h-9 text-sm"
                              />
                            </div>

                            {editError && (
                              <p className="text-xs text-destructive">{editError}</p>
                            )}

                            <div className="flex gap-2 pt-1">
                              <Button
                                size="sm"
                                onClick={saveProfile}
                                disabled={isSaving}
                                className="flex-1 h-8 text-xs"
                              >
                                {isSaving ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Check className="w-3.5 h-3.5 mr-1" />
                                )}
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={cancelEditing}
                                disabled={isSaving}
                                className="flex-1 h-8 text-xs"
                              >
                                <XCircle className="w-3.5 h-3.5 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </motion.div>
                        ): (
                          <motion.div
                            key="view-mode"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {/* ─── Read-Only Details ─── */}
                            <div className="p-4 space-y-2.5">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4 shrink-0" />
                                <span className="truncate">{user?.phone || "—"}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4 shrink-0" />
                                <span className="truncate">{user?.email || "Not added"}</span>
                              </div>
                            </div>

                            {/* ─── Actions ─── */}
                            <div className="border-t border-border p-2 flex flex-col">
                              <button
                                onClick={startEditing}
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors text-left"
                              >
                                <Pencil className="w-4 h-4" />
                                Edit Profile
                              </button>
                              <Link
                                href="/SavedProp"
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                              >
                                <UserIcon className="w-4 h-4" />
                                Saved/Liked Properties
                              </Link>
                              {user?.role === "ADMIN" && (
                                <Link
                                  href="/cms"
                                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                                >
                                  <ShieldCheck className="w-4 h-4" />
                                  Admin Hub
                                </Link>
                              )}
                              <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors text-left"
                              >
                                <LogOut className="w-4 h-4" />
                                Logout
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button
                className="bg-[#0D1B2A] text-[#FAF7F2] hover:bg-[#0D1B2A]/90 border border-[#C9A84C]/50 shadow-[0_2px_10px_rgba(15,23,42,0.12)]"
                asChild
              >
                <Link href="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#0D1B2A]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#C9A84C]/25">
            <nav className="flex flex-col gap-4 text-[15px]">
              <div>
                <button
                  onClick={() => setIsResidentialOpen(!isResidentialOpen)}
                  className="flex items-center justify-between w-full text-[#0D1B2A]/70 hover:text-[#0D1B2A] transition-colors"
                >
                  <span>Residential</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isResidentialOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isResidentialOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 mt-2 space-y-1 border-l-2 border-primary/20">
                        {RESIDENTIAL_TYPES.map((type) => {
                          const Icon = type.icon;
                          return (
                            <Link
                              key={type.label}
                              href={type.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Icon className="w-4 h-4 text-primary/70" />
                              {type.label}
                            </Link>
                          );
                        })}
                        <Link
                          href="/Projects"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2 py-2 text-sm font-medium text-[#0D1B2A]"
                        >
                          View All Projects
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <button
                  onClick={() => setIsCommercialOpen(!isCommercialOpen)}
                  className="flex items-center justify-between w-full text-[#0D1B2A]/70 hover:text-[#0D1B2A] transition-colors"
                >
                  <span>Commercial</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isCommercialOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isCommercialOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 mt-2 space-y-1 border-l-2 border-primary/20">
                        {COMMERCIAL_TYPES.map((type) => {
                          const Icon = type.icon;
                          return (
                            <Link
                              key={type.label}
                              href={type.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Icon className="w-4 h-4 text-primary/70" />
                              {type.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="text-[#0D1B2A]/70 hover:text-[#0D1B2A] transition-colors">
                Blogs
              </Link>
              <Link href="#" onClick={() => setIsMenuOpen(false)} className="text-[#0D1B2A]/70 hover:text-[#0D1B2A] transition-colors">
                About
              </Link>

              <div className="flex flex-col gap-2 pt-4 border-t border-[#C9A84C]/25">
                <div className="flex items-center justify-between">
                  <span className="text-[#0D1B2A]/70 text-sm">Theme</span>
                  <ThemeToggle />
                </div>
                <Button variant="ghost" className="justify-start text-[#0D1B2A]/70 hover:text-[#0D1B2A] hover:bg-[#0D1B2A]/5" asChild>
                  {isAuthenticated ? (
                    user?.role === "ADMIN" ? (
                      <Link href="/cms" onClick={() => setIsMenuOpen(false)}>Admin Hub</Link>
                    ) : (
                      <Link href="/SavedProp" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                    )
                  ) : (
                    <Link href="/auth" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                  )}
                </Button>

                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="justify-start text-[#0D1B2A]/70 hover:text-destructive gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      <motion.div
        className="header-ornament"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="absolute bottom-0 left-0 w-full h-px bg-[linear-gradient(90deg,transparent_0%,#c9a84c_20%,#f5e6a7_50%,#c9a84c_80%,transparent_100%)]" />
      </motion.div>
    </motion.header>
  )
}