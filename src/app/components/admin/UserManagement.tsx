import { useState } from "react";
import {
  Check,
  X,
  Search,
  Filter,
  UserCheck,
  UserX,
  Eye,
  MapPin,
  Phone,
  Mail,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Label } from "../ui/label";
import { toast } from "sonner@2.0.3";

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Estado para formulario de crear/editar usuario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Productor",
    community: "",
    municipality: "Sica Sica",
    status: "APROBADO",
  });

  // Mock data de usuarios
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Juan Mamani Condori",
      email: "juan.mamani@email.com",
      phone: "+591 7123-4567",
      role: "Productor",
      community: "Comunidad Villa Remedios",
      municipality: "Sica Sica",
      status: "PENDIENTE",
      registeredAt: "2024-11-24",
      products: 5,
    },
    {
      id: "2",
      name: "María Quispe Laura",
      email: "maria.quispe@email.com",
      phone: "+591 7234-5678",
      role: "Productor",
      community: "Comunidad Vinto Coopani",
      municipality: "Patacamaya",
      status: "APROBADO",
      registeredAt: "2024-11-20",
      products: 8,
    },
    {
      id: "3",
      name: "Roberto Flores Pérez",
      email: "roberto.flores@email.com",
      phone: "+591 7890-1234",
      role: "Comprador",
      community: "N/A",
      municipality: "La Paz",
      status: "APROBADO",
      registeredAt: "2024-11-18",
      products: 0,
    },
    {
      id: "4",
      name: "Pedro Condori Mamani",
      email: "pedro.condori@email.com",
      phone: "+591 7345-6789",
      role: "Productor",
      community: "Comunidad Jalsuri",
      municipality: "Sica Sica",
      status: "PENDIENTE",
      registeredAt: "2024-11-25",
      products: 3,
    },
    {
      id: "5",
      name: "Rosa Apaza Quispe",
      email: "rosa.apaza@email.com",
      phone: "+591 7456-7890",
      role: "Productor",
      community: "Comunidad Ulloma",
      municipality: "Patacamaya",
      status: "APROBADO",
      registeredAt: "2024-11-15",
      products: 12,
    },
    {
      id: "6",
      name: "Carlos Choque Flores",
      email: "carlos.choque@email.com",
      phone: "+591 7567-8901",
      role: "Productor",
      community: "Comunidad Machacamarca",
      municipality: "Sica Sica",
      status: "RECHAZADO",
      registeredAt: "2024-11-22",
      products: 0,
    },
    {
      id: "7",
      name: "Ana García López",
      email: "ana.garcia@email.com",
      phone: "+591 7234-9876",
      role: "Comprador",
      community: "N/A",
      municipality: "Oruro",
      status: "PENDIENTE",
      registeredAt: "2024-11-25",
      products: 0,
    },
    {
      id: "8",
      name: "José Ticona Mamani",
      email: "jose.ticona@email.com",
      phone: "+591 7123-9876",
      role: "Productor",
      community: "Comunidad Villa Remedios",
      municipality: "Sica Sica",
      status: "APROBADO",
      registeredAt: "2024-11-10",
      products: 6,
    },
    {
      id: "9",
      name: "Dr. Fernando Vargas",
      email: "fernando.vargas@umsa.bo",
      phone: "+591 7100-0001",
      role: "Administrador",
      community: "UMSA - Agronomía",
      municipality: "La Paz",
      status: "APROBADO",
      registeredAt: "2024-10-01",
      products: 0,
    },
    {
      id: "10",
      name: "Ing. Patricia Sánchez",
      email: "patricia.sanchez@umsa.bo",
      phone: "+591 7100-0002",
      role: "Administrador",
      community: "UMSA - Coordinación",
      municipality: "La Paz",
      status: "APROBADO",
      registeredAt: "2024-10-05",
      products: 0,
    },
  ]);

  // Filtrar usuarios
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.community.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Estadísticas
  const stats = {
    total: users.length,
    pending: users.filter((u) => u.status === "PENDIENTE").length,
    approved: users.filter((u) => u.status === "APROBADO").length,
    rejected: users.filter((u) => u.status === "RECHAZADO").length,
  };

  const handleApprove = (userId: string, userName: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "APROBADO" } : user
      )
    );
    toast.success(`Usuario aprobado`, {
      description: `${userName} ha sido aprobado exitosamente`,
    });
  };

  const handleReject = (userId: string, userName: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "RECHAZADO" } : user
      )
    );
    toast.error(`Usuario rechazado`, {
      description: `${userName} ha sido rechazado`,
    });
  };

  // Función para crear usuario
  const handleCreateUser = () => {
    const newUser = {
      id: String(users.length + 1),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      community: formData.role === "Comprador" ? "N/A" : formData.community,
      municipality: formData.municipality,
      status: formData.status,
      registeredAt: new Date().toISOString().split("T")[0],
      products: 0,
    };

    setUsers([...users, newUser]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast.success("Usuario creado", {
      description: `${newUser.name} ha sido agregado exitosamente`,
    });
  };

  // Función para editar usuario
  const handleEditUser = () => {
    setUsers(
      users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              role: formData.role,
              community:
                formData.role === "Comprador" ? "N/A" : formData.community,
              municipality: formData.municipality,
              status: formData.status,
            }
          : user
      )
    );
    setIsEditDialogOpen(false);
    setSelectedUser(null);
    resetForm();
    toast.success("Usuario actualizado", {
      description: `Los cambios han sido guardados exitosamente`,
    });
  };

  // Función para eliminar usuario
  const handleDeleteUser = (userId: string, userName: string) => {
    setUsers(users.filter((user) => user.id !== userId));
    toast.success("Usuario eliminado", {
      description: `${userName} ha sido eliminado del sistema`,
    });
  };

  // Función para abrir el diálogo de edición
  const openEditDialog = (user: any) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      community: user.community === "N/A" ? "" : user.community,
      municipality: user.municipality,
      status: user.status,
    });
    setIsEditDialogOpen(true);
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "Productor",
      community: "",
      municipality: "Sica Sica",
      status: "APROBADO",
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      PENDIENTE: "bg-yellow-500 text-white",
      APROBADO: "bg-green-500 text-white",
      RECHAZADO: "bg-red-500 text-white",
    };
    return styles[status as keyof typeof styles];
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Valida y administra los usuarios de la plataforma
          </p>
        </div>
        
        {/* Botón Crear Usuario */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#3BA935] hover:bg-[#2E8B2A]">
              <Plus className="mr-2 h-5 w-5" />
              Crear Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Usuario</DialogTitle>
              <DialogDescription>
                Registra un nuevo productor, comprador o administrador en el sistema
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="create-name">Nombre Completo *</Label>
                <Input
                  id="create-name"
                  placeholder="Ej: Juan Mamani"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-email">Email *</Label>
                <Input
                  id="create-email"
                  type="email"
                  placeholder="ejemplo@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-phone">Teléfono *</Label>
                <Input
                  id="create-phone"
                  placeholder="+591 7123-4567"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-role">Rol *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger id="create-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Productor">Productor</SelectItem>
                    <SelectItem value="Comprador">Comprador</SelectItem>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.role === "Productor" && (
                <div className="space-y-2">
                  <Label htmlFor="create-community">Comunidad *</Label>
                  <Input
                    id="create-community"
                    placeholder="Ej: Comunidad Villa Remedios"
                    value={formData.community}
                    onChange={(e) =>
                      setFormData({ ...formData, community: e.target.value })
                    }
                  />
                </div>
              )}

              {formData.role === "Administrador" && (
                <div className="space-y-2">
                  <Label htmlFor="create-organization">Organización/Departamento *</Label>
                  <Input
                    id="create-organization"
                    placeholder="Ej: UMSA - Agronomía"
                    value={formData.community}
                    onChange={(e) =>
                      setFormData({ ...formData, community: e.target.value })
                    }
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="create-municipality">Municipio *</Label>
                <Select
                  value={formData.municipality}
                  onValueChange={(value) =>
                    setFormData({ ...formData, municipality: value })
                  }
                >
                  <SelectTrigger id="create-municipality">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sica Sica">Sica Sica</SelectItem>
                    <SelectItem value="Patacamaya">Patacamaya</SelectItem>
                    <SelectItem value="La Paz">La Paz</SelectItem>
                    <SelectItem value="Oruro">Oruro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-status">Estado *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="create-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                    <SelectItem value="APROBADO">Aprobado</SelectItem>
                    <SelectItem value="RECHAZADO">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button
                className="bg-[#3BA935] hover:bg-[#2E8B2A]"
                onClick={handleCreateUser}
                disabled={
                  !formData.name ||
                  !formData.email ||
                  !formData.phone ||
                  ((formData.role === "Productor" || formData.role === "Administrador") && !formData.community)
                }
              >
                Crear Usuario
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Usuarios</p>
                <h2 className="text-blue-500">{stats.total}</h2>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <h2 className="text-yellow-500">{stats.pending}</h2>
              </div>
              <UserX className="h-8 w-8 text-yellow-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aprobados</p>
                <h2 className="text-green-500">{stats.approved}</h2>
              </div>
              <Check className="h-8 w-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rechazados</p>
                <h2 className="text-red-500">{stats.rejected}</h2>
              </div>
              <X className="h-8 w-8 text-red-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Buscar por nombre, email o comunidad..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filtro por Estado */}
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                  <SelectItem value="APROBADO">Aprobado</SelectItem>
                  <SelectItem value="RECHAZADO">Rechazado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por Rol */}
            <div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los roles</SelectItem>
                  <SelectItem value="Productor">Productor</SelectItem>
                  <SelectItem value="Comprador">Comprador</SelectItem>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>
            Lista de Usuarios ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Comunidad/Ciudad</TableHead>
                  <TableHead>Municipio</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Registrado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p>{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>{user.community}</TableCell>
                    <TableCell>{user.municipality}</TableCell>
                    <TableCell>
                      <p className="text-sm">{user.phone}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.registeredAt).toLocaleDateString("es-BO")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Botón Ver Detalles */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Detalles del Usuario</DialogTitle>
                              <DialogDescription>
                                Información completa de {user.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Email
                                  </p>
                                  <p>{user.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Teléfono
                                  </p>
                                  <p>{user.phone}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Ubicación
                                  </p>
                                  <p>
                                    {user.community}, {user.municipality}
                                  </p>
                                </div>
                              </div>
                              {user.role === "Productor" && (
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Productos registrados
                                  </p>
                                  <p>{user.products}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* Botones de Acción según estado */}
                        {user.status === "PENDIENTE" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleApprove(user.id, user.name)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleReject(user.id, user.name)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {user.status === "RECHAZADO" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleApprove(user.id, user.name)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}

                        {/* Botón Editar */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => openEditDialog(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        {/* Botón Eliminar */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                ¿Estás seguro?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará
                                permanentemente a {user.name} del sistema.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() =>
                                  handleDeleteUser(user.id, user.name)
                                }
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo de Editar Usuario */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>
              Actualiza la información de {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nombre Completo *</Label>
              <Input
                id="edit-name"
                placeholder="Ej: Juan Mamani"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="ejemplo@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone">Teléfono *</Label>
              <Input
                id="edit-phone"
                placeholder="+591 7123-4567"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-role">Rol *</Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger id="edit-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Productor">Productor</SelectItem>
                  <SelectItem value="Comprador">Comprador</SelectItem>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.role === "Productor" && (
              <div className="space-y-2">
                <Label htmlFor="edit-community">Comunidad *</Label>
                <Input
                  id="edit-community"
                  placeholder="Ej: Comunidad Villa Remedios"
                  value={formData.community}
                  onChange={(e) =>
                    setFormData({ ...formData, community: e.target.value })
                  }
                />
              </div>
            )}

            {formData.role === "Administrador" && (
              <div className="space-y-2">
                <Label htmlFor="edit-organization">Organización/Departamento *</Label>
                <Input
                  id="edit-organization"
                  placeholder="Ej: UMSA - Agronomía"
                  value={formData.community}
                  onChange={(e) =>
                    setFormData({ ...formData, community: e.target.value })
                  }
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="edit-municipality">Municipio *</Label>
              <Select
                value={formData.municipality}
                onValueChange={(value) =>
                  setFormData({ ...formData, municipality: value })
                }
              >
                <SelectTrigger id="edit-municipality">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sica Sica">Sica Sica</SelectItem>
                  <SelectItem value="Patacamaya">Patacamaya</SelectItem>
                  <SelectItem value="La Paz">La Paz</SelectItem>
                  <SelectItem value="Oruro">Oruro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-status">Estado *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="edit-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                  <SelectItem value="APROBADO">Aprobado</SelectItem>
                  <SelectItem value="RECHAZADO">Rechazado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedUser(null);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#3BA935] hover:bg-[#2E8B2A]"
              onClick={handleEditUser}
              disabled={
                !formData.name ||
                !formData.email ||
                !formData.phone ||
                ((formData.role === "Productor" || formData.role === "Administrador") && !formData.community)
              }
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}