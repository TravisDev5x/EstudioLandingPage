"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/dashboard/ModeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, Menu } from "lucide-react";

type SubLink = { label: string; href: string; description: string };
type NavLink = { label: string; href: string };
type NavEntry = NavLink | { label: string; items: SubLink[] };

function isDropdown(entry: NavEntry): entry is { label: string; items: SubLink[] } {
  return "items" in entry;
}

const navEntries: NavEntry[] = [
  { label: "Inicio", href: "/" },
  {
    label: "Nosotros",
    items: [
      { label: "El estudio", href: "/#about", description: "Conoce nuestro espacio y filosofía" },
      { label: "Equipo", href: "/#equipo", description: "El talento detrás de STUDIO" },
      { label: "Galería", href: "/#galeria", description: "Fotos y video del estudio" },
    ],
  },
  {
    label: "Servicios",
    items: [
      { label: "Grabación", href: "/#servicios", description: "Sesiones profesionales en cabina" },
      { label: "Producción musical", href: "/#produccion", description: "De la idea al master final" },
      { label: "Clases / Formación", href: "/#clases", description: "Aprende producción, síntesis y mezcla" },
      { label: "Mezcla y Master", href: "/#mezcla", description: "Sonido pulido y listo para distribuir" },
    ],
  },
  { label: "Precios", href: "/#precios" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/#contacto" },
];

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8 lg:px-10 border-b border-border bg-background/80 backdrop-blur-md">
      <span className="font-mono text-[15px] font-semibold text-foreground tracking-tight">STUDIO</span>

      <NavigationMenu className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <NavigationMenuList className="gap-7">
          {navEntries.map((entry) =>
            isDropdown(entry) ? (
              <NavigationMenuItem key={entry.label}>
                <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground data-popup-open:text-foreground">
                  {entry.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 p-2 w-[280px]">
                    {entry.items.map((sub) => (
                      <li key={sub.href}>
                        <NavigationMenuLink
                          render={<Link href={sub.href} />}
                          closeOnClick
                          className="flex-col items-start gap-0.5"
                        >
                          <span className="text-sm font-medium text-foreground">{sub.label}</span>
                          <span className="text-xs text-muted-foreground">{sub.description}</span>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={entry.href}>
                <NavigationMenuLink
                  render={<Link href={entry.href} />}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {entry.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-2">
        <ModeToggle />

        <div className="hidden lg:flex items-center gap-2">
          <Button size="sm" variant="ghost" nativeButton={false} render={<Link href="/login" />}>
            Iniciar sesión
          </Button>
          <Button size="sm" className="flex items-center gap-1.5">
            <Calendar size={14} />
            Reservar sesión
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
            <Menu />
            <span className="sr-only">Abrir menú</span>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col">
            <SheetHeader>
              <SheetTitle>STUDIO</SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-4 overflow-y-auto flex-1">
              {navEntries.map((entry) =>
                isDropdown(entry) ? (
                  <Accordion key={entry.label}>
                    <AccordionItem value={entry.label} className="border-none">
                      <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-2">
                        {entry.label}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1 pl-3">
                          {entry.items.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setOpen(false)}
                              className="rounded-lg p-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg p-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    {entry.label}
                  </Link>
                )
              )}
            </nav>

            <SheetFooter>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-sm text-muted-foreground">Tema</span>
                <ModeToggle />
              </div>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/login" onClick={() => setOpen(false)} />}
                className="w-full"
              >
                Iniciar sesión
              </Button>
              <Button
                variant="ghost"
                nativeButton={false}
                render={<Link href="/register" onClick={() => setOpen(false)} />}
                className="w-full"
              >
                Crear cuenta
              </Button>
              <Button className="w-full flex items-center gap-1.5" onClick={() => setOpen(false)}>
                <Calendar size={14} />
                Reservar sesión
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
