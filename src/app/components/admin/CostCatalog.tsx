import { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Tractor,
  Users,
  Sprout,
  Search,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner@2.0.3";

interface CostItem {
  id: string;
  category: string;
  name: string;
  type: "Fijo" | "Variable";
  status: "Activo" | "Inactivo";
  icon: any;
}

export function CostCatalog() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CostItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    type: "Variable" as "Fijo" | "Variable",
    status: "Activo" as "Activo" | "Inactivo",
  });

  // Catálogo de ítems de costo
  const [costItems, setCostItems] = useState<CostItem[]>([
    // MAQUINARIA
    {
      id: "01",
      category: "Maquinaria para Roturar",
      name: "Servicio de Roturado con Tractor",
      type: "Variable",
      status: "Activo",
      icon: Tractor,
    },
    {
      id: "02",
      category: "Maquinaria para Siembra",
      name: "Sembradora Mecánica",
      type: "Variable",
      status: "Activo",
      icon: Tractor,
    },
    {
      id: "03",
      category: "Maquinaria para Cosecha",
      name: "Cosechadora Combinada",
      type: "Variable",
      status: "Activo",
      icon: Tractor,
    },
    // MANO DE OBRA
    {
      id: "04",
      category: "Mano de obra para roturar",
      name: "Jornal para Preparación de Terreno",
      type: "Variable",
      status: "Activo",
      icon: Users,
    },
    {
      id: "05",
      category: "Mano de obra para siembra",
      name: "Jornal de Siembra Manual",
      type: "Variable",
      status: "Activo",
      icon: Users,
    },
    {
      id: "06",
      category: "Mano de obra para labores culturales",
      name: "Jornal Aporque y Deshierbe",
      type: "Variable",
      status: "Activo",
      icon: Users,
    },
    {
      id: "07",
      category: "Mano de obra para cosecha",
      name: "Jornal de Cosecha Manual",
      type: "Variable",
      status: "Activo",
      icon: Users,
    },
    // FERTILIZANTES
    {
      id: "08",
      category: "Fertilizantes químicos",
      name: "Urea (46% N)",
      type: "Variable",
      status: "Activo",
      icon: Sprout,
    },
    {
      id: "09",
      category: "Fertilizantes químicos",
      name: "Fosfato Diamónico (DAP)",
      type: "Variable",
      status: "Activo",
      icon: Sprout,
    },
    {
      id: "10",
      category: "Fertilizantes orgánicos",
      name: "Abono Orgánico (Biol)",
      type: "Variable",
      status: "Activo",
      icon: Sprout,
    },
    {
      id: "11",
      category: "Fertilizantes orgánicos",
      name: "Compost Natural",
      type: "Variable",
      status: "Activo",
      icon: Sprout,
    },
  ]);

  const handleCreateItem = () => {
    if (!formData.category || !formData.name) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    const iconMap: { [key: string]: any } = {
      "Maquinaria para Roturar": Tractor,
      "Maquinaria para Siembra": Tractor,
      "Maquinaria para Cosecha": Tractor,
      "Mano de obra para roturar": Users,
      "Mano de obra para siembra": Users,
      "Mano de obra para labores culturales": Users,
      "Mano de obra para cosecha": Users,
      "Fertilizantes químicos": Sprout,
      "Fertilizantes orgánicos": Sprout,
    };

    const newItem: CostItem = {
      id: (costItems.length + 1).toString().padStart(2, "0"),
      category: formData.category,
      name: formData.name,
      type: formData.type,
      status: formData.status,
      icon: iconMap[formData.category] || Tractor,
    };

    setCostItems([...costItems, newItem]);
    setShowCreateModal(false);
    setFormData({
      category: "",
      name: "",
      type: "Variable",
      status: "Activo",
    });
    toast.success("Ítem de costo creado exitosamente");
  };

  const handleEditItem = () => {
    if (!selectedItem || !formData.category || !formData.name) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    const iconMap: { [key: string]: any } = {
      "Maquinaria para Roturar": Tractor,
      "Maquinaria para Siembra": Tractor,
      "Maquinaria para Cosecha": Tractor,
      "Mano de obra para roturar": Users,
      "Mano de obra para siembra": Users,
      "Mano de obra para labores culturales": Users,
      "Mano de obra para cosecha": Users,
      "Fertilizantes químicos": Sprout,
      "Fertilizantes orgánicos": Sprout,
    };

    const updatedItems = costItems.map((item) =>
      item.id === selectedItem.id
        ? {
            ...item,
            category: formData.category,
            name: formData.name,
            type: formData.type,
            status: formData.status,
            icon: iconMap[formData.category] || Tractor,
          }
        : item
    );

    setCostItems(updatedItems);
    setShowEditModal(false);
    setSelectedItem(null);
    setFormData({
      category: "",
      name: "",
      type: "Variable",
      status: "Activo",
    });
    toast.success("Ítem de costo actualizado exitosamente");
  };

  const handleDeleteItem = (id: string) => {
    setCostItems(costItems.filter((item) => item.id !== id));
    toast.success("Ítem de costo eliminado");
  };

  const openEditModal = (item: CostItem) => {
    setSelectedItem(item);
    setFormData({
      category: item.category,
      name: item.name,
      type: item.type,
      status: item.status,
    });
    setShowEditModal(true);
  };

  const filteredItems = costItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    if (category.toLowerCase().includes("maquinaria")) return "bg-blue-100 text-blue-700";
    if (category.toLowerCase().includes("mano de obra")) return "bg-orange-100 text-orange-700";
    if (category.toLowerCase().includes("fertilizante")) return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-700";
  };

  const categories = [
    "Maquinaria para Roturar",
    "Maquinaria para Siembra",
    "Maquinaria para Cosecha",
    "Mano de obra para roturar",
    "Mano de obra para siembra",
    "Mano de obra para labores culturales",
    "Mano de obra para cosecha",
    "Fertilizantes químicos",
    "Fertilizantes orgánicos",
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Gestión de Catálogos de Costos</h1>
          <p className="text-muted-foreground">
            Define los tipos de gastos permitidos para los productores
          </p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#3BA935] hover:bg-[#2E8B2A]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Ítem de Costo
        </Button>
      </div>

      {/* Barra de Búsqueda */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por categoría o nombre del ítem..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Tabla de Ítems de Costo */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">
                  Categoría
                </th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">
                  Nombre del Ítem
                </th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Tipo</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">
                  Estado
                </th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-gray-600">{item.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-2 rounded-lg ${
                            item.category.toLowerCase().includes("maquinaria")
                              ? "bg-blue-100"
                              : item.category.toLowerCase().includes("mano de obra")
                              ? "bg-orange-100"
                              : "bg-green-100"
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 ${
                              item.category.toLowerCase().includes("maquinaria")
                                ? "text-blue-600"
                                : item.category.toLowerCase().includes("mano de obra")
                                ? "text-orange-600"
                                : "text-green-600"
                            }`}
                          />
                        </div>
                        <span className="text-sm">{item.category}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {item.name}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={item.type === "Variable" ? "outline" : "default"}
                        className={
                          item.type === "Variable"
                            ? "border-blue-500 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }
                      >
                        {item.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={item.status === "Activo" ? "default" : "secondary"}
                        className={
                          item.status === "Activo"
                            ? "bg-[#3BA935] hover:bg-[#2E8B2A]"
                            : "bg-gray-400"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(item)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No se encontraron ítems de costo
          </div>
        )}
      </Card>

      {/* Modal de Crear Ítem */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Ítem de Costo</DialogTitle>
            <DialogDescription>
              Define un nuevo tipo de gasto para el catálogo oficial
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="create-category">Categoría *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger id="create-category">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maquinaria para Roturar">
                    🚜 Maquinaria para Roturar
                  </SelectItem>
                  <SelectItem value="Maquinaria para Siembra">
                    🚜 Maquinaria para Siembra
                  </SelectItem>
                  <SelectItem value="Maquinaria para Cosecha">
                    🚜 Maquinaria para Cosecha
                  </SelectItem>
                  <SelectItem value="Mano de obra para roturar">
                    👷 Mano de obra para roturar
                  </SelectItem>
                  <SelectItem value="Mano de obra para siembra">
                    👷 Mano de obra para siembra
                  </SelectItem>
                  <SelectItem value="Mano de obra para labores culturales">
                    👷 Mano de obra para labores culturales
                  </SelectItem>
                  <SelectItem value="Mano de obra para cosecha">
                    👷 Mano de obra para cosecha
                  </SelectItem>
                  <SelectItem value="Fertilizantes químicos">
                    🌱 Fertilizantes químicos
                  </SelectItem>
                  <SelectItem value="Fertilizantes orgánicos">
                    🌱 Fertilizantes orgánicos
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-name">Nombre del Ítem *</Label>
              <Input
                id="create-name"
                placeholder="Ej: Servicio de Roturado con Tractor"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="create-type">Tipo</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "Fijo" | "Variable") =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger id="create-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Variable">Variable</SelectItem>
                    <SelectItem value="Fijo">Fijo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-status">Estado</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "Activo" | "Inactivo") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="create-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreateItem}
              className="bg-[#3BA935] hover:bg-[#2E8B2A]"
            >
              Crear Ítem
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Editar Ítem */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Ítem de Costo</DialogTitle>
            <DialogDescription>
              Modifica la información del ítem de costo
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category">Categoría *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger id="edit-category">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maquinaria para Roturar">
                    🚜 Maquinaria para Roturar
                  </SelectItem>
                  <SelectItem value="Maquinaria para Siembra">
                    🚜 Maquinaria para Siembra
                  </SelectItem>
                  <SelectItem value="Maquinaria para Cosecha">
                    🚜 Maquinaria para Cosecha
                  </SelectItem>
                  <SelectItem value="Mano de obra para roturar">
                    👷 Mano de obra para roturar
                  </SelectItem>
                  <SelectItem value="Mano de obra para siembra">
                    👷 Mano de obra para siembra
                  </SelectItem>
                  <SelectItem value="Mano de obra para labores culturales">
                    👷 Mano de obra para labores culturales
                  </SelectItem>
                  <SelectItem value="Mano de obra para cosecha">
                    👷 Mano de obra para cosecha
                  </SelectItem>
                  <SelectItem value="Fertilizantes químicos">
                    🌱 Fertilizantes químicos
                  </SelectItem>
                  <SelectItem value="Fertilizantes orgánicos">
                    🌱 Fertilizantes orgánicos
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-name">Nombre del Ítem *</Label>
              <Input
                id="edit-name"
                placeholder="Ej: Servicio de Roturado con Tractor"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-type">Tipo</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "Fijo" | "Variable") =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger id="edit-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Variable">Variable</SelectItem>
                    <SelectItem value="Fijo">Fijo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Estado</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "Activo" | "Inactivo") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleEditItem}
              className="bg-[#3BA935] hover:bg-[#2E8B2A]"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
