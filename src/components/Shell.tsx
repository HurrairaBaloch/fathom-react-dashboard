import { DEMO_NOTICE } from "@/lib/format";
import { navItems } from "@/lib/nav";
import { notifications as seedNotes } from "@triptych/shared-data";
import { clsx } from "clsx";
import {
  Bell,
  ExternalLink,
  Menu,
  MessageSquare,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FathomLogo } from "./Logo";
import { Input } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;

export function Shell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [range, setRange] = useState("30d");
  const [notes, setNotes] = useState(seedNotes);
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setNotesOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const unread = notes.filter((n) => !n.read).length;
  const title = useMemo(
    () => navItems.find((n) => n.to === location.pathname)?.label ?? "Overview",
    [location.pathname],
  );

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="flex min-h-screen">
        <aside
          className={clsx(
            "fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-line bg-surface transition-transform duration-300 ease-[var(--ease)] md:static md:translate-x-0",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-16 items-center gap-3 border-b border-line px-5">
            <FathomLogo size={36} />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-tight">Fathom</p>
              <p className="truncate text-[11px] text-ink-muted">Analytics console</p>
            </div>
            <button
              type="button"
              className="ml-auto rounded-[10px] p-2 text-ink-muted hover:bg-surface-2 md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    clsx(
                      "group relative flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-brand-soft text-brand-ink"
                        : "text-ink-muted hover:bg-surface-2 hover:text-ink",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand"
                          transition={{ duration: 0.25, ease }}
                        />
                      )}
                      <Icon size={18} className="shrink-0" strokeWidth={isActive ? 2.25 : 1.75} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="space-y-2 border-t border-line p-3">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
              Other frameworks
            </p>
            <a
              href={import.meta.env.VITE_NEXT_URL || "http://localhost:3001/showcase/nextjs"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-[12px] px-3 py-2 text-sm text-ink-muted transition hover:bg-surface-2 hover:text-ink"
            >
              Haven · Next.js <ExternalLink size={14} />
            </a>
            <a
              href={import.meta.env.VITE_ANGULAR_URL || "http://localhost:4200/"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-[12px] px-3 py-2 text-sm text-ink-muted transition hover:bg-surface-2 hover:text-ink"
            >
              Northline · Angular <ExternalLink size={14} />
            </a>
            <p className="px-2 pt-1 text-[11px] leading-relaxed text-ink-muted">{DEMO_NOTICE}</p>
          </div>
        </aside>

        {mobileOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-ink/25 backdrop-blur-[2px] md:hidden"
            aria-label="Close overlay"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface/90 px-3 backdrop-blur-md md:px-6">
            <button
              type="button"
              className="rounded-[12px] p-2 text-ink-muted hover:bg-surface-2 md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>

            <div className="relative hidden min-w-0 flex-1 md:block">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
              <Input
                className="max-w-xl pl-11"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search metrics, customers, orders…"
                aria-label="Search"
              />
            </div>

            <select
              className="h-10 rounded-[12px] border border-line bg-surface px-3 text-sm text-ink outline-none transition focus:border-brand"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              aria-label="Date range"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="ytd">Year to date</option>
            </select>

            <button
              type="button"
              className="hidden rounded-[12px] p-2.5 text-ink-muted transition hover:bg-surface-2 hover:text-ink sm:inline-flex"
              aria-label="Messages"
            >
              <MessageSquare size={18} />
            </button>

            <div className="relative">
              <button
                type="button"
                className="relative rounded-[12px] p-2.5 text-ink-muted transition hover:bg-surface-2 hover:text-ink"
                aria-label="Notifications"
                onClick={() => {
                  setNotesOpen((v) => !v);
                  setProfileOpen(false);
                }}
              >
                <Bell size={18} />
                {unread > 0 && (
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger ring-2 ring-surface" />
                )}
              </button>
              <AnimatePresence>
                {notesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease }}
                    className="absolute right-0 top-12 z-30 w-[340px] overflow-hidden rounded-[18px] border border-line bg-surface shadow-[var(--shadow-2)]"
                  >
                    <div className="flex items-center justify-between border-b border-line px-4 py-3">
                      <p className="text-sm font-semibold">Notifications</p>
                      <button
                        type="button"
                        className="text-xs font-semibold text-brand-ink"
                        onClick={() => setNotes((prev) => prev.map((n) => ({ ...n, read: true })))}
                      >
                        Mark all read
                      </button>
                    </div>
                    <ul className="max-h-80 overflow-y-auto">
                      {notes.map((n) => (
                        <li
                          key={n.id}
                          className={clsx(
                            "border-b border-line px-4 py-3 last:border-0",
                            !n.read && "bg-brand-soft/35",
                          )}
                        >
                          <p className="text-sm font-semibold">{n.title}</p>
                          <p className="mt-0.5 text-xs text-ink-muted">{n.body}</p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-3 transition hover:shadow-[var(--shadow-1)]"
                onClick={() => {
                  setProfileOpen((v) => !v);
                  setNotesOpen(false);
                }}
                aria-label="Profile menu"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-slate text-[11px] font-bold text-white">
                  MH
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-xs font-semibold leading-tight">Maren Holtz</span>
                  <span className="block text-[10px] text-ink-muted">Workspace admin</span>
                </span>
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18, ease }}
                    className="absolute right-0 top-12 z-30 w-48 rounded-[14px] border border-line bg-surface p-1 shadow-[var(--shadow-2)]"
                  >
                    <button type="button" className="w-full rounded-[10px] px-3 py-2 text-left text-sm hover:bg-surface-2">
                      Profile
                    </button>
                    <button type="button" className="w-full rounded-[10px] px-3 py-2 text-left text-sm hover:bg-surface-2">
                      Preferences
                    </button>
                    <button type="button" className="w-full rounded-[10px] px-3 py-2 text-left text-sm hover:bg-surface-2">
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease }}
              >
                <Outlet context={{ range, query, title }} />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
