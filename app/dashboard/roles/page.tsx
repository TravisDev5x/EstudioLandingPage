"use client";
import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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

type Role = { id: number; nombre: string; descripcion: string | null; creadoEn: string };
type RoleForm = { nombre: string; descripcion: string };
type EditingRole = { id: number; nombre: string; descripcion: string } | null;
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

const emptyForm: RoleForm = { nombre: "", descripcion: "" };

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<RoleForm>(emptyForm);

  const [editingRole, setEditingRole] = useState<EditingRole>(null);
  const [confirmDelete, setConfirmDelete] = useState<ConfirmDelete>(null);

  const fetchRoles = async (page: number) => {
    setIsLoading(true);
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(LIMIT));

    const res = await fetch(`/api/roles?${params.toString()}`);
    const data = await res.json();
    setRoles(data.roles);
    setCurrentPage(data.page);
    setTotalPages(data.totalPages);
    setIsLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRoles(1);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchRoles(page);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(typeof data.error === "string" ? data.error : "Error al crear el rol");
      }
      setCreateForm(emptyForm);
      setIsCreateOpen(false);
      fetchRoles(currentPage);
      toast.success("Rol creado correctamente");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al crear el rol");
    }
  };

  const handleUpdate = async () => {
    if (!editingRole) return;
    try {
      const res = await fetch(`/api/roles/${editingRole.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: editingRole.nombre, descripcion: editingRole.descripcion }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(typeof data.error === "string" ? data.error : "Error al actualizar el rol");
      }
      setEditingRole(null);
      fetchRoles(currentPage);
      toast.success("Rol actualizado correctamente");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al actualizar el rol");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/roles/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(typeof data.error === "string" ? data.error : "Error al eliminar el rol");
      }
      fetchRoles(currentPage);
      toast.success("Rol eliminado correctamente");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al eliminar el rol");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Roles</CardTitle>
        <Button size="sm" onClick={() => setIsCreateOpen(true)}>
          <Plus />
          Nuevo rol
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : roles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No hay roles registrados todavía.
                </TableCell>
              </TableRow>
            ) : (
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.id}</TableCell>
                  <TableCell className="font-medium">{role.nombre}</TableCell>
                  <TableCell className="text-muted-foreground">{role.descripcion || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(role.creadoEn).toLocaleDateString("es-MX")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Editar"
                        onClick={() =>
                          setEditingRole({
                            id: role.id,
                            nombre: role.nombre,
                            descripcion: role.descripcion ?? "",
                          })
                        }
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Eliminar"
                        className="hover:text-destructive"
                        onClick={() => setConfirmDelete({ id: role.id, nombre: role.nombre })}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Pagination className="mt-4">
          <PaginationContent>
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

      {/* Dialog de creación */}
      <Dialog
        open={isCreateOpen}
        onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) setCreateForm(emptyForm);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo rol</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="create-nombre">Nombre</Label>
              <Input
                id="create-nombre"
                value={createForm.nombre}
                onChange={(e) => setCreateForm((f) => ({ ...f, nombre: e.target.value }))}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="create-descripcion">Descripción</Label>
              <Textarea
                id="create-descripcion"
                value={createForm.descripcion}
                onChange={(e) => setCreateForm((f) => ({ ...f, descripcion: e.target.value }))}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Crear rol</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog de edición */}
      <Dialog open={editingRole !== null} onOpenChange={(open) => !open && setEditingRole(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar rol</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-nombre">Nombre</Label>
              <Input
                id="edit-nombre"
                value={editingRole?.nombre || ""}
                onChange={(e) =>
                  setEditingRole((r) => (r ? { ...r, nombre: e.target.value } : null))
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-descripcion">Descripción</Label>
              <Textarea
                id="edit-descripcion"
                value={editingRole?.descripcion || ""}
                onChange={(e) =>
                  setEditingRole((r) => (r ? { ...r, descripcion: e.target.value } : null))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingRole(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdate}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AlertDialog de confirmación de eliminación */}
      <AlertDialog open={confirmDelete !== null} onOpenChange={(open) => !open && setConfirmDelete(null)}>
        <AlertDialogContent size="sm" className="text-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">¿Eliminar rol?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Se eliminará el rol &quot;{confirmDelete?.nombre}&quot; de forma permanente.
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
    </Card>
  );
}
