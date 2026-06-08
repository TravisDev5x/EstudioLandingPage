"use client";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { Pencil, Trash2, RotateCcw, Search, LogOut } from "lucide-react";
import {
  Card,
  CardContent,
  TextField,
  Input,
  Label,
  SearchField,
  SearchFieldGroup,
  SearchFieldInput,
  SearchFieldClearButton,
  Button,
  Switch,
  Chip,
  Avatar,
  AvatarFallback,
  Tooltip,
  TooltipContent,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  Skeleton,
  Modal,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalHeading,
  ModalBody,
  ModalFooter,
  toast,
} from "@heroui/react";

type EditingUser = { id: number; nombre: string; email: string };
type ConfirmDelete = { id: number; nombre: string } | null;

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

export default function DashboardPage() {
  const { data: session } = useSession();
  const sessionInitials = session?.user?.name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "??";

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ nombre, email }),
      });
      if (!res.ok) throw new Error();
      setNombre("");
      setEmail("");
      fetchUsuarios(currentPage);
      toast.success("Usuario creado correctamente");
    } catch {
      toast.danger("Error al crear el usuario");
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
        body: JSON.stringify({ nombre: editingUser.nombre, email: editingUser.email }),
      });
      if (!res.ok) throw new Error();
      setEditingUser(null);
      fetchUsuarios(currentPage);
      toast.success("Usuario actualizado");
    } catch {
      toast.danger("Error al actualizar");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-[#0a0e1a]/80 backdrop-blur border-b border-white/8 px-6 h-12 flex items-center justify-between">
        <span className="text-[13px] font-medium text-white/70">Registro de Usuarios</span>
        <div className="flex items-center gap-2">
          <Avatar size="sm" className="bg-indigo-500/30 w-7 h-7">
            <AvatarFallback className="text-indigo-300 text-[11px]">{sessionInitials}</AvatarFallback>
          </Avatar>
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            onPress={() => signOut({ callbackUrl: "/login" })}
            aria-label="Cerrar sesión"
          >
            <LogOut size={16} />
          </Button>
        </div>
      </nav>

      <main className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-8 pt-20">
        {/* Orbs de fondo */}
        <div
          style={{
            position: "fixed",
            top: -100,
            left: -100,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "#4f46e5",
            filter: "blur(80px)",
            opacity: 0.18,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "fixed",
            bottom: -80,
            right: -80,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "#0ea5e9",
            filter: "blur(80px)",
            opacity: 0.18,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "fixed",
            top: "40%",
            right: "15%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "#7c3aed",
            filter: "blur(80px)",
            opacity: 0.18,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Card principal */}
        <Card className="w-full max-w-md relative z-10">
          <CardContent className="p-10">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-[22px] font-medium text-white/90 mb-1">Registro de Usuarios</h1>
              <p className="text-[13px] text-white/40">Añade y gestiona los usuarios del sistema</p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <TextField value={nombre} onChange={setNombre} isRequired>
                <Label>Nombre</Label>
                <Input placeholder="Ej. Juan Pérez" className="bg-white/5 border-white/10" />
              </TextField>
              <TextField value={email} onChange={setEmail} isRequired>
                <Label>Correo electrónico</Label>
                <Input type="email" placeholder="ejemplo@correo.com" className="bg-white/5 border-white/10" />
              </TextField>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" size="md">
                Guardar usuario
              </Button>
            </form>

            {/* Divider */}
            <div className="h-px bg-white/8 my-8" />

            {/* Búsqueda */}
            <SearchField value={searchTerm} onChange={handleSearchChange} onClear={handleSearchClear} className="mb-5">
              <SearchFieldGroup className="bg-white/5 border-white/10">
                <Search size={15} className="text-white/40" />
                <SearchFieldInput placeholder="Buscar por nombre o email..." />
                <SearchFieldClearButton />
              </SearchFieldGroup>
            </SearchField>

            {/* Encabezado de lista + toggle papelera */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] tracking-[0.1em] uppercase text-white/30">
                {showTrash ? "Usuarios eliminados" : "Usuarios registrados"}
              </p>
              <Switch isSelected={showTrash} onChange={setShowTrash} size="sm">
                <span className="text-xs text-white/40">Papelera</span>
              </Switch>
            </div>

            {isLoading ? (
              <div className="flex flex-col gap-2">
                {[0, 1, 2].map((i) => (
                  <Card key={i} className="w-full space-y-3 p-3 border border-white/8">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-9 h-9 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-3/4 rounded-lg" />
                        <Skeleton className="h-3 w-1/2 rounded-lg" />
                      </div>
                    </div>
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
                  const initials = user.nombre
                    .split(" ")
                    .map((w: string) => w[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);
                  return (
                    <Card key={user.id} className="border border-white/8">
                      <CardContent className="flex flex-row items-center gap-3 p-3">
                        <Avatar size="sm" className="bg-indigo-500/30">
                          <AvatarFallback className="text-indigo-300">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-white/85">{user.nombre}</p>
                          <p className="text-xs truncate text-white/35">{user.email}</p>
                        </div>
                        <Chip size="sm" variant="soft" color="default">
                          #{user.id}
                        </Chip>
                        <div className="flex gap-1">
                          {!showTrash && (
                            <Tooltip>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                onPress={() =>
                                  setEditingUser({ id: user.id, nombre: user.nombre, email: user.email })
                                }
                              >
                                <Pencil size={13} />
                              </Button>
                              <TooltipContent>Editar</TooltipContent>
                            </Tooltip>
                          )}
                          {!showTrash ? (
                            <Tooltip>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="danger-soft"
                                onPress={() => setConfirmDelete({ id: user.id, nombre: user.nombre })}
                              >
                                <Trash2 size={13} />
                              </Button>
                              <TooltipContent>Eliminar</TooltipContent>
                            </Tooltip>
                          ) : (
                            <Tooltip>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                onPress={() => handleRestore(user.id)}
                              >
                                <RotateCcw size={13} />
                              </Button>
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

            <Pagination size="sm" className="mt-4">
              <PaginationContent className="justify-center">
                <PaginationItem>
                  <PaginationPrevious
                    isDisabled={currentPage <= 1}
                    onPress={() => handlePageChange(currentPage - 1)}
                  >
                    Anterior
                  </PaginationPrevious>
                </PaginationItem>
                {getPageNumbers(currentPage, totalPages).map((p, i) =>
                  p === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p}>
                      <PaginationLink isActive={p === currentPage} onPress={() => handlePageChange(p)}>
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    isDisabled={currentPage >= totalPages}
                    onPress={() => handlePageChange(currentPage + 1)}
                  >
                    Siguiente
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>

        {/* Modal de edición */}
        <Modal isOpen={editingUser !== null} onOpenChange={(open) => !open && setEditingUser(null)}>
          <ModalBackdrop variant="blur">
            <ModalContainer>
              <ModalDialog className="dark">
                <ModalHeader>
                  <ModalHeading>Editar usuario</ModalHeading>
                </ModalHeader>
                <ModalBody>
                  <TextField
                    value={editingUser?.nombre || ""}
                    onChange={(v) => setEditingUser((u) => (u ? { ...u, nombre: v } : null))}
                  >
                    <Label>Nombre</Label>
                    <Input />
                  </TextField>
                  <TextField
                    value={editingUser?.email || ""}
                    onChange={(v) => setEditingUser((u) => (u ? { ...u, email: v } : null))}
                  >
                    <Label>Email</Label>
                    <Input type="email" />
                  </TextField>
                </ModalBody>
                <ModalFooter>
                  <Button variant="secondary" onPress={() => setEditingUser(null)}>
                    Cancelar
                  </Button>
                  <Button variant="primary" onPress={handleUpdate}>
                    Guardar cambios
                  </Button>
                </ModalFooter>
              </ModalDialog>
            </ModalContainer>
          </ModalBackdrop>
        </Modal>

        {/* Modal de confirmación de eliminación */}
        <Modal isOpen={confirmDelete !== null} onOpenChange={(open) => !open && setConfirmDelete(null)}>
          <ModalBackdrop variant="blur">
            <ModalContainer size="sm">
              <ModalDialog className="dark">
                <ModalBody className="pt-6 text-center">
                  <p className="text-4xl mb-2">⚠️</p>
                  <p className="font-medium text-white/90">¿Eliminar usuario?</p>
                  <p className="text-sm text-white/40">
                    Se moverá &quot;{confirmDelete?.nombre}&quot; a la papelera
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="secondary" onPress={() => setConfirmDelete(null)}>
                    Cancelar
                  </Button>
                  <Button
                    variant="danger"
                    onPress={() => {
                      handleDelete(confirmDelete!.id);
                      setConfirmDelete(null);
                    }}
                  >
                    Eliminar
                  </Button>
                </ModalFooter>
              </ModalDialog>
            </ModalContainer>
          </ModalBackdrop>
        </Modal>
      </main>
    </>
  );
}
