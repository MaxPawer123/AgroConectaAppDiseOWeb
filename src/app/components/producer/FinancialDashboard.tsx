import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../ui/select";
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Tractor,
  Users,
  Sprout,
  Plus,
  Calendar,
  Download,
  AlertTriangle,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { toast } from "sonner@2.0.3";

interface FinancialDashboardProps {
  onBack?: () => void;
}

export function FinancialDashboard({ onBack }: FinancialDashboardProps) {
  const [showCostModal, setShowCostModal] = useState(false);
  const [costForm, setCostForm] = useState({
    category: "",
    subcategory: "",
    unitPrice: "",
    quantity: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  // Datos del lote
  const loteInfo = {
    code: "Q-2025",
    name: "Lote Quinua Real",
    status: "En Crecimiento",
    statusColor: "bg-[#3BA935]",
    area: "2.5 Ha",
    variety: "Quinua Real Blanca",
    sowingDate: "15 Oct 2024",
    estimatedHarvest: "Mar 2025",
    image: "https://images.unsplash.com/photo-1643412390887-6b98fd788909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWlub2ElMjBmaWVsZCUyMGZhcm1pbmd8ZW58MXx8fHwxNzY0NjIzNTk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  };

  // Datos para el gráfico de Proyección
  const projectionData = [
    {
      month: "Oct 2024",
      costoAcumulado: 2500,
      ingresoProyectado: 0,
    },
    {
      month: "Nov 2024",
      costoAcumulado: 5800,
      ingresoProyectado: 0,
    },
    {
      month: "Dic 2024",
      costoAcumulado: 8200,
      ingresoProyectado: 0,
    },
    {
      month: "Ene 2025",
      costoAcumulado: 10500,
      ingresoProyectado: 0,
    },
    {
      month: "Feb 2025",
      costoAcumulado: 12800,
      ingresoProyectado: 0,
    },
    {
      month: "Mar 2025",
      costoAcumulado: 15200,
      ingresoProyectado: 35000,
    },
  ];

  // Costos registrados
  const [costs, setCosts] = useState([
    {
      id: "1",
      date: "15 Oct 2024",
      category: "Maquinaria",
      subcategory: "Para Roturar",
      detail: "Tractor para Roturar",
      amount: 2500,
      icon: Tractor,
    },
    {
      id: "2",
      date: "20 Oct 2024",
      category: "Mano de Obra",
      subcategory: "Para Siembra",
      detail: "Jornal Siembra (10 personas)",
      amount: 2000,
      icon: Users,
    },
    {
      id: "3",
      date: "25 Oct 2024",
      category: "Fertilizantes",
      subcategory: "Orgánicos",
      detail: "Abono Orgánico (Biol) - 50 Litros",
      amount: 1300,
      icon: Sprout,
    },
    {
      id: "4",
      date: "10 Nov 2024",
      category: "Maquinaria",
      subcategory: "Para Siembra",
      detail: "Sembradora Mecánica",
      amount: 2400,
      icon: Tractor,
    },
    {
      id: "5",
      date: "15 Nov 2024",
      category: "Mano de Obra",
      subcategory: "Labores Culturales",
      detail: "Jornal Aporque y Deshierbe",
      amount: 1500,
      icon: Users,
    },
  ]);

  // Calcular totales por categoría
  const totalMaquinaria = costs
    .filter((c) => c.category === "Maquinaria")
    .reduce((sum, c) => sum + c.amount, 0);
  const totalManoObra = costs
    .filter((c) => c.category === "Mano de Obra")
    .reduce((sum, c) => sum + c.amount, 0);
  const totalFertilizantes = costs
    .filter((c) => c.category === "Fertilizantes")
    .reduce((sum, c) => sum + c.amount, 0);
  const totalCostos = totalMaquinaria + totalManoObra + totalFertilizantes;

  // Ingreso proyectado
  const ingresoProyectado = 35000;
  const gananciaPotencial = ingresoProyectado - totalCostos;
  const margenGanancia = ((gananciaPotencial / ingresoProyectado) * 100).toFixed(1);

  // Opciones de categorías y subcategorías
  const categoryOptions = {
    "Maquinaria para Roturar": ["Tractor", "Arado", "Rastra"],
    "Maquinaria para Siembra": ["Sembradora Mecánica", "Sembradora Manual"],
    "Maquinaria para Cosecha": ["Cosechadora Combinada", "Trilladora"],
    "Mano de obra para roturar": ["Jornal Preparación Terreno"],
    "Mano de obra para siembra": ["Jornal Siembra Manual", "Jornal Siembra Mecánica"],
    "Mano de obra para labores culturales": ["Jornal Aporque", "Jornal Deshierbe", "Jornal Riego"],
    "Mano de obra para cosecha": ["Jornal Cosecha Manual", "Jornal Cosecha Mecánica"],
    "Fertilizantes químicos": ["Urea (46% N)", "Fosfato Diamónico (DAP)", "Cloruro de Potasio"],
    "Fertilizantes orgánicos": ["Abono Orgánico (Biol)", "Compost Natural", "Humus de Lombriz"],
  };

  const handleCategoryChange = (value: string) => {
    setCostForm({ ...costForm, category: value, subcategory: "" });
  };

  const handleSaveCost = () => {
    if (
      !costForm.category ||
      !costForm.subcategory ||
      !costForm.unitPrice ||
      !costForm.quantity
    ) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    const total = parseFloat(costForm.unitPrice) * parseFloat(costForm.quantity);
    
    const iconMap: { [key: string]: any } = {
      Maquinaria: Tractor,
      "Mano de Obra": Users,
      Fertilizantes: Sprout,
    };

    const newCost = {
      id: (costs.length + 1).toString(),
      date: costForm.date,
      category: costForm.category,
      subcategory: costForm.subcategory,
      detail: `${costForm.subcategory} - ${costForm.description || "Sin descripción"}`,
      amount: total,
      icon: iconMap[costForm.category],
    };

    setCosts([...costs, newCost]);
    setShowCostModal(false);
    setCostForm({
      category: "",
      subcategory: "",
      unitPrice: "",
      quantity: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
    toast.success("Costo registrado exitosamente");
  };

  const calculateTotal = () => {
    if (costForm.unitPrice && costForm.quantity) {
      return (parseFloat(costForm.unitPrice) * parseFloat(costForm.quantity)).toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        {/* Botón Volver */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Mis Lotes
        </Button>

        {/* Header del Lote */}
        <Card className="mb-6 overflow-hidden">
          <div className="relative h-48">
            <ImageWithFallback
              src={loteInfo.image}
              alt="Campo de Quinua Real"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-white">Lote {loteInfo.code}</h1>
                    <Badge className={`${loteInfo.statusColor} text-white`}>
                      🌱 {loteInfo.status}
                    </Badge>
                  </div>
                  <div className="flex gap-6 text-sm text-white/90">
                    <span>📏 Área: {loteInfo.area}</span>
                    <span>🌾 {loteInfo.variety}</span>
                    <span>📅 Siembra: {loteInfo.sowingDate}</span>
                    <span>🗓️ Cosecha est.: {loteInfo.estimatedHarvest}</span>
                  </div>
                </div>
                <Button variant="secondary" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Reporte
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Tarjetas de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Tractor className="h-5 w-5 text-white" />
              </div>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Gasto en Maquinaria</p>
            <p className="text-blue-900">Bs {totalMaquinaria.toLocaleString()}</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Gasto en Jornales</p>
            <p className="text-orange-900">Bs {totalManoObra.toLocaleString()}</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-500 rounded-lg">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Gasto en Insumos</p>
            <p className="text-green-900">Bs {totalFertilizantes.toLocaleString()}</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-500 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <AlertTriangle className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Costo Total Acumulado</p>
            <p className="text-purple-900">Bs {totalCostos.toLocaleString()}</p>
          </Card>
        </div>

        {/* Gráfico Principal: Proyección de Ingresos vs Costos */}
        <Card className="mb-6 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-900">Proyección de Ingresos vs Costos</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-gray-600">Costo Acumulado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3BA935]"></div>
                  <span className="text-gray-600">Ingreso Proyectado</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Análisis financiero del lote desde la siembra hasta la cosecha estimada
            </p>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => `Bs ${value.toLocaleString()}`}
              />
              <Legend />
              <Bar
                dataKey="costoAcumulado"
                fill="#ef4444"
                name="Costo Acumulado Actual"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="ingresoProyectado"
                fill="#3BA935"
                name="Ingreso Proyectado (Cosecha)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Resumen de Proyección */}
          <div className="mt-6 p-4 bg-gradient-to-r from-[#E8F5E9] to-[#F1F8E9] rounded-lg border border-green-200">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Invertido</p>
                <p className="text-red-700">Bs {totalCostos.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Ingreso Proyectado</p>
                <p className="text-[#3BA935]">
                  Bs {ingresoProyectado.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Ganancia Potencial</p>
                <p className="text-green-700">
                  Bs {gananciaPotencial.toLocaleString()} ({margenGanancia}%)
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabla de Costos Registrados */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-gray-900 mb-1">Costos Registrados</h3>
              <p className="text-sm text-muted-foreground">
                Historial detallado de gastos del lote
              </p>
            </div>
            <Button
              onClick={() => setShowCostModal(true)}
              className="bg-[#3BA935] hover:bg-[#2E8B2A]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Registrar Nuevo Costo
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-600">
                    Fecha
                  </th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">
                    Categoría
                  </th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">
                    Detalle
                  </th>
                  <th className="text-right py-3 px-4 text-sm text-gray-600">
                    Monto
                  </th>
                </tr>
              </thead>
              <tbody>
                {costs.map((cost) => {
                  const Icon = cost.icon;
                  return (
                    <tr
                      key={cost.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          {cost.date}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-lg ${
                              cost.category === "Maquinaria"
                                ? "bg-blue-100"
                                : cost.category === "Mano de Obra"
                                ? "bg-orange-100"
                                : "bg-green-100"
                            }`}
                          >
                            <Icon
                              className={`h-4 w-4 ${
                                cost.category === "Maquinaria"
                                  ? "text-blue-600"
                                  : cost.category === "Mano de Obra"
                                  ? "text-orange-600"
                                  : "text-green-600"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="text-sm">{cost.category}</p>
                            <p className="text-xs text-muted-foreground">
                              {cost.subcategory}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {cost.detail}
                      </td>
                      <td className="py-3 px-4 text-right">
                        Bs {cost.amount.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="py-3 px-4 text-right text-gray-700">
                    Total
                  </td>
                  <td className="py-3 px-4 text-right text-gray-900">
                    Bs {totalCostos.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>

      {/* Modal de Registrar Nuevo Costo */}
      <Dialog open={showCostModal} onOpenChange={setShowCostModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Registrar Gasto - Lote Quinua {loteInfo.code}</DialogTitle>
            <DialogDescription>
              Ingresa los detalles del nuevo costo para este lote de quinua
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría de Gasto *</Label>
                <Select
                  value={costForm.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maquinaria para Roturar">
                      <div className="flex items-center gap-2">
                        <Tractor className="h-4 w-4" />
                        Maquinaria para Roturar
                      </div>
                    </SelectItem>
                    <SelectItem value="Maquinaria para Siembra">
                      <div className="flex items-center gap-2">
                        <Tractor className="h-4 w-4" />
                        Maquinaria para Siembra
                      </div>
                    </SelectItem>
                    <SelectItem value="Maquinaria para Cosecha">
                      <div className="flex items-center gap-2">
                        <Tractor className="h-4 w-4" />
                        Maquinaria para Cosecha
                      </div>
                    </SelectItem>
                    <SelectItem value="Mano de obra para roturar">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Mano de obra para roturar
                      </div>
                    </SelectItem>
                    <SelectItem value="Mano de obra para siembra">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Mano de obra para siembra
                      </div>
                    </SelectItem>
                    <SelectItem value="Mano de obra para labores culturales">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Mano de obra para labores culturales
                      </div>
                    </SelectItem>
                    <SelectItem value="Mano de obra para cosecha">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Mano de obra para cosecha
                      </div>
                    </SelectItem>
                    <SelectItem value="Fertilizantes químicos">
                      <div className="flex items-center gap-2">
                        <Sprout className="h-4 w-4" />
                        Fertilizantes químicos
                      </div>
                    </SelectItem>
                    <SelectItem value="Fertilizantes orgánicos">
                      <div className="flex items-center gap-2">
                        <Sprout className="h-4 w-4" />
                        Fertilizantes orgánicos
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subcategory">Tipo de Gasto *</Label>
                <Select
                  value={costForm.subcategory}
                  onValueChange={(value) =>
                    setCostForm({ ...costForm, subcategory: value })
                  }
                  disabled={!costForm.category}
                >
                  <SelectTrigger id="subcategory">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {costForm.category &&
                      categoryOptions[
                        costForm.category as keyof typeof categoryOptions
                      ]?.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción del Gasto</Label>
              <Input
                id="description"
                placeholder="Ej: Tractor John Deere 4 horas, 15 jornales, etc."
                value={costForm.description}
                onChange={(e) =>
                  setCostForm({ ...costForm, description: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unitPrice">Precio Unitario (Bs) *</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={costForm.unitPrice}
                  onChange={(e) =>
                    setCostForm({ ...costForm, unitPrice: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Cantidad *</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.01"
                  placeholder="0"
                  value={costForm.quantity}
                  onChange={(e) =>
                    setCostForm({ ...costForm, quantity: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="total">Total (Bs)</Label>
                <Input
                  id="total"
                  value={calculateTotal()}
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Fecha del Gasto *</Label>
              <Input
                id="date"
                type="date"
                value={costForm.date}
                onChange={(e) =>
                  setCostForm({ ...costForm, date: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCostModal(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#3BA935] hover:bg-[#2E8B2A]"
              onClick={handleSaveCost}
            >
              Guardar Costo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}