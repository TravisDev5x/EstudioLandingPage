"use client";
import { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, RotateCcw, Search, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type EditingUser = { id: number; name: string; email: string };
type ConfirmDelete = { id: number; name: string } | null;

const LIMIT = 5;

const getPageNumbers = (current: number, total: number): (number | "ellipsis")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  if (current > 3) pages.push("ellipsis");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p);
  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);
  return pages;
};

export default function UsuariosPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [showTrash, setShowTrash] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<ConfirmDelete>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchRef = useRef("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchUsuarios = async (page: number) => {
    setIsLoading(true);
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(LIMIT));
    if (showTrash) params.set("trash", "true");
    if (searchRef.current.trim() !== "") params.set("search", searchRef.current.trim());

    const res = await fetch(`/api/users?${params.toString()}`);
    const data = await res.json();
    setUsuarios(data.usuarios);
    setCurrentPage(data.page);
    setTotalPages(data.totalPages);
    setIsLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsuarios(currentPage);
  }, [showTrash]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    searchRef.current = value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setCurrentPage(1);
      fetchUsuarios(1);
    }, 300);
  };

  const handleSearchClear = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchTerm("");
    searchRef.current = "";
    setCurrentPage(1);
    fetchUsuarios(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error();
      setName("");
      setEmail("");
      fetchUsuarios(currentPage);
      toast.success("Usuario creado correctamente");
    } catch {
      toast.error("Error al crear el usuario");
    }
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    fetchUsuarios(currentPage);
    toast.success("Usuario movido a la papelera");
  };

  const handleRestore = async (id: number) => {
    await fetch(`/api/users/${id}`, { method: "PATCH" });
    fetchUsuarios(currentPage);
    toast.success("Usuario restaurado");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchUsuarios(page);
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    try {
      const res = await fetch(`/api/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingUser.name, email: editingUser.email }),
      });
      if (!res.ok) throw new Error();
      setEditingUser(null);
      fetchUsuarios(currentPage);
      toast.success("Usuario actualizado");
    } catch {
      toast.error("Error al actualizar");
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      {/* Card principal */}
      <Card className="w-full max-w-md py-0 gap-0 ring-0 border-white/10 bg-white/5 shadow-none">
        <CardContent className="p-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[22px] font-medium text-white/90 mb-1">Registro de Usuarios</h1>
            <p className="text-[13px] text-white/40">Añade y gestiona los usuarios del sistema</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="text-white/60">Nombre</Label>
              <Input
                id="name"
                placeholder="Ej. Juan Pérez"
                className="bg-white/5 border-white/10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-white/60">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@correo.com"
                className="bg-white/5 border-white/10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              Guardar usuario
            </Button>
          </form>

          {/* Divider */}
          <div className="h-px bg-white/[0.08] my-8" />

          {/* Búsqueda */}
          <div className="relative mb-5">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10" />
            <Input
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 pr-8 bg-white/5 border-white/10"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleSearchClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Encabezado de lista + toggle papelera */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] tracking-[0.1em] uppercase text-white/30">
              {showTrash ? "Usuarios eliminados" : "Usuarios registrados"}
            </p>
            <div className="flex items-center gap-2">
              <Switch
                id="papelera-switch"
                checked={showTrash}
                onCheckedChange={(checked) => setShowTrash(checked)}
                size="sm"
              />
              <label htmlFor="papelera-switch" className="text-xs text-white/40 cursor-pointer">
                Papelera
              </label>
            </div>
          </div>

          {/* Lista */}
          <TooltipProvider>
            {isLoading ? (
              <div className="flex flex-col gap-2">
                {[0, 1, 2].map((i) => (
                  <Card key={i} className="py-0 gap-0 ring-0 shadow-none border border-white/[0.08]">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-9 h-9 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-3 w-3/4 rounded-lg" />
                          <Skeleton className="h-3 w-1/2 rounded-lg" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : usuarios.length === 0 ? (
              <p className="text-center py-6 text-[13px] text-white/20">
                {showTrash ? "La papelera está vacía." : "No hay usuarios registrados todavía."}
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {usuarios.map((user) => {
                  const initials = user.name
                    .split(" ")
                    .map((w: string) => w[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);
                  return (
                    <Card key={user.id} className="py-0 gap-0 ring-0 shadow-none border border-white/[0.08]">
                      <CardContent className="p-3 flex flex-row items-center gap-3">
                        <Avatar size="sm" className="bg-indigo-500/30">
                          <AvatarFallback className="text-indigo-300 text-xs bg-transparent">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-white/85">{user.name}</p>
                          <p className="text-xs truncate text-white/35">{user.email}</p>
                        </div>
                        <Badge variant="secondary" className="bg-white/[0.06] text-white/40 border-transparent text-[11px] shrink-0">
                          #{user.id}
                        </Badge>
                        <div className="flex gap-1">
                          {!showTrash && (
                            <Tooltip>
                              <TooltipTrigger
                                onClick={() =>
                                  setEditingUser({ id: user.id, name: user.name, email: user.email })
                                }
                                className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
                              >
                                <Pencil size={13} />
                              </TooltipTrigger>
                              <TooltipContent>Editar</TooltipContent>
                            </Tooltip>
                          )}
                          {!showTrash ? (
                            <Tooltip>
                              <TooltipTrigger
                                onClick={() => setConfirmDelete({ id: user.id, name: user.name })}
                                className={cn(
                                  buttonVariants({ variant: "ghost", size: "icon-sm" }),
                                  "hover:text-red-400 hover:bg-red-500/[0.08]"
                                )}
                              >
                                <Trash2 size={13} />
                              </TooltipTrigger>
                              <TooltipContent>Eliminar</TooltipContent>
                            </Tooltip>
                          ) : (
                            <Tooltip>
                              <TooltipTrigger
                                onClick={() => handleRestore(user.id)}
                                className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
                              >
                                <RotateCcw size={13} />
                              </TooltipTrigger>
                              <TooltipContent>Restaurar</TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TooltipProvider>

          {/* Paginación */}
          <Pagination className="mt-4">
            <PaginationContent className="justify-center">
              <PaginationItem>
                <PaginationPrevious
                  text="Anterior"
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage <= 1 ? "pointer-events-none opacity-30" : "cursor-pointer"}
                />
              </PaginationItem>
              {getPageNumbers(currentPage, totalPages).map((p, i) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === currentPage}
                      onClick={() => handlePageChange(p as number)}
                      className="cursor-pointer"
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  text="Siguiente"
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-30" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>

      {/* Dialog de edición */}
      <Dialog open={editingUser !== null} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="bg-[#0f1120] border-white/10 ring-0">
          <DialogHeader>
            <DialogTitle>Editar usuario</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-name">Nombre</Label>
              <Input
                id="edit-name"
                value={editingUser?.name || ""}
                onChange={(e) =>
                  setEditingUser((u) => (u ? { ...u, name: e.target.value } : null))
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editingUser?.email || ""}
                onChange={(e) =>
                  setEditingUser((u) => (u ? { ...u, email: e.target.value } : null))
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdate}>Guardar cambios</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* AlertDialog de confirmación de eliminación */}
      <AlertDialog open={confirmDelete !== null} onOpenChange={(open) => !open && setConfirmDelete(null)}>
        <AlertDialogContent size="sm" className="bg-[#0f1120] border-white/10 ring-0 text-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">¿Eliminar usuario?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Se moverá &quot;{confirmDelete?.name}&quot; a la papelera. Esta acción se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center gap-2 pt-2">
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancelar
            </Button>
            <Button
              className="bg-destructive hover:bg-destructive/90 text-white"
              onClick={() => {
                handleDelete(confirmDelete!.id);
                setConfirmDelete(null);
              }}
            >
              Eliminar
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
