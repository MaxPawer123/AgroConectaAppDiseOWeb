import { useState } from "react";
import { Plus, Trash2, Calculator, TrendingUp, MapPin, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { toast } from "sonner@2.0.3";

interface CostItem {
  id: string;
  category: string;
  paymentMode: "cycle" | "annual";
  description: string;
  amount: number;
}

export function CostCalculatorForm() {
  const [costs, setCosts] = useState<CostItem[]>([
    {
      id: "1",
      category: "Alquiler de Terreno",
      paymentMode: "annual",
      description: "Alquiler Lote",
      amount: 2000,
    },
  ]);

  const [newCost, setNewCost] = useState({
    category: "Alquiler de Terreno",
    paymentMode: "cycle" as "cycle" | "annual",
    description: "",
    amount: "",
  });

  // Categorías de costos
  const categories = [
    "Alquiler de Terreno",
    "Semillas",
    "Fertilizantes químicos",
    "Fertilizantes orgánicos",
    "Maquinaria para Roturar",
    "Maquinaria para Siembra",
    "Maquinaria para Cosecha",
    "Mano de obra para roturar",
    "Mano de obra para siembra",
    "Mano de obra labores culturales",
    "Mano de obra para cosecha",
    "Pesticidas",
    "Transporte",
    "Agua/Riego",
    "Herramientas",
    "Otros",
  ];

  // Calcular totales
  const totalCosts = costs.reduce((sum, cost) => sum + cost.amount, 0);
  const projectedRevenue = 1750; // Mock data
  const profitMargin = totalCosts > 0 ? ((projectedRevenue - totalCosts) / projectedRevenue) * 100 : 0;

  // Agregar gasto
  const handleAddCost = () => {
    if (!newCost.description || !newCost.amount) {
      toast.error("Por favor completa la descripción y el monto");
      return;
    }

    const cost: CostItem = {
      id: Date.now().toString(),
      category: newCost.category,
      paymentMode: newCost.paymentMode,
      description: newCost.description,
      amount: Number(newCost.amount),
    };

    setCosts([...costs, cost]);
    setNewCost({
      category: "Alquiler de Terreno",
      paymentMode: "cycle",
      description: "",
      amount: "",
    });
    toast.success("Gasto agregado exitosamente");
  };

  // Eliminar gasto
  const handleDeleteCost = (id: string) => {
    setCosts(costs.filter((c) => c.id !== id));
    toast.success("Gasto eliminado");
  };

  // Obtener icono por categoría
  const getCategoryIcon = (category: string) => {
    if (category.includes("Terreno")) return <MapPin className="h-5 w-5 text-[#A87C4F]" />;
    if (category.includes("Maquinaria")) return <span className="text-lg">🚜</span>;
    if (category.includes("Mano de obra")) return <span className="text-lg">👷</span>;
    if (category.includes("Fertilizantes")) return <span className="text-lg">🌱</span>;
    return <span className="text-lg">📦</span>;
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT COLUMN - FORM */}
          <div className="space-y-6">
            {/* Registrar Gastos Card */}
            <Card className="shadow-lg">
              <CardHeader className="border-b bg-white">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-[#3BA935]" />
                  Registrar Gastos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {/* Categoría */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base">
                    Categoría
                  </Label>
                  <Select
                    value={newCost.category}
                    onValueChange={(value) =>
                      setNewCost({ ...newCost, category: value })
                    }
                  >
                    <SelectTrigger id="category" className="h-12 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="text-base py-3">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Modalidad de Pago - NEW DYNAMIC SECTION */}
                <div className="space-y-3 bg-gradient-to-r from-[#E8F5E9] to-[#FFF9E6] p-4 rounded-lg border border-[#3BA935]/20">
                  <Label className="text-base flex items-center gap-2">
                    Modalidad de Pago
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            <strong>Por Ciclo:</strong> Pago único para esta cosecha.
                            <br />
                            <strong>Anual:</strong> Pago que cubre todo el año agrícola.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <RadioGroup
                    value={newCost.paymentMode}
                    onValueChange={(value: "cycle" | "annual") =>
                      setNewCost({ ...newCost, paymentMode: value })
                    }
                    className="grid grid-cols-2 gap-3"
                  >
                    <div className="relative">
                      <RadioGroupItem
                        value="cycle"
                        id="cycle"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="cycle"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#3BA935] peer-data-[state=checked]:bg-[#E8F5E9] cursor-pointer transition-all"
                      >
                        <span className="text-base font-medium">Por Ciclo</span>
                        <span className="text-xs text-muted-foreground text-center mt-1">
                          Solo esta cosecha
                        </span>
                      </Label>
                    </div>
                    <div className="relative">
                      <RadioGroupItem
                        value="annual"
                        id="annual"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="annual"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#F7C331] peer-data-[state=checked]:bg-[#FFF9E6] cursor-pointer transition-all"
                      >
                        <span className="text-base font-medium">Anual</span>
                        <span className="text-xs text-muted-foreground text-center mt-1">
                          Todo el año
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base">
                    Descripción
                  </Label>
                  <Input
                    id="description"
                    value={newCost.description}
                    onChange={(e) =>
                      setNewCost({ ...newCost, description: e.target.value })
                    }
                    placeholder="Ej. Alquiler parcela comunidad norte"
                    className="h-12 text-base"
                  />
                </div>

                {/* Monto */}
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-base">
                    Monto (Bs)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={newCost.amount}
                    onChange={(e) =>
                      setNewCost({ ...newCost, amount: e.target.value })
                    }
                    placeholder="0.00"
                    className="h-12 text-base"
                  />
                </div>

                {/* Button */}
                <Button
                  onClick={handleAddCost}
                  className="w-full h-12 text-base bg-[#3BA935] hover:bg-[#2E8B2A] text-white"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Agregar Gasto
                </Button>
              </CardContent>
            </Card>

            {/* Lista de Gastos */}
            <Card className="shadow-lg">
              <CardHeader className="border-b bg-white">
                <CardTitle className="text-lg">Gastos Registrados</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {costs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No hay gastos registrados</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {costs.map((cost) => (
                      <div
                        key={cost.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="shrink-0">
                            {getCategoryIcon(cost.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {cost.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {cost.category}
                              </span>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  cost.paymentMode === "annual"
                                    ? "border-[#F7C331] text-[#F7C331]"
                                    : "border-[#3BA935] text-[#3BA935]"
                                }`}
                              >
                                {cost.paymentMode === "annual" ? "Anual" : "Por Ciclo"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <p className="font-semibold text-red-600">
                            - Bs {cost.amount.toLocaleString()}
                          </p>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteCost(cost.id)}
                            className="hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN - DASHBOARD CARDS */}
          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {/* Card 1 - Resumen Financiero (Green) */}
            <Card className="shadow-xl bg-gradient-to-br from-[#3BA935] to-[#2E8B2A] text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Calculator className="h-8 w-8 text-white/90" />
                  <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                    Actualizado
                  </Badge>
                </div>
                <h3 className="text-lg font-medium text-white/90 mb-2">
                  Resumen Financiero
                </h3>
                <div className="mb-2">
                  <p className="text-sm text-white/80 mb-1">Total Costos</p>
                  <p className="text-5xl font-bold text-white">
                    Bs {totalCosts.toLocaleString()}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">Ciclo actual</span>
                    <span className="text-white font-medium">Q-2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 - Ingresos Proyectados (Yellow/Orange) */}
            <Card className="shadow-xl bg-gradient-to-br from-[#F7C331] to-[#E6B325] text-gray-900 border-0">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-gray-800/80" />
                  <Badge className="bg-white/40 text-gray-900 hover:bg-white/50 backdrop-blur-sm">
                    Proyección
                  </Badge>
                </div>
                <h3 className="text-lg font-medium text-gray-800/90 mb-2">
                  Ingresos Proyectados
                </h3>
                <div className="mb-2">
                  <p className="text-sm text-gray-800/70 mb-1">Ingresos Totales</p>
                  <p className="text-5xl font-bold text-gray-900">
                    Bs {projectedRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-800/70">Precio por kg</span>
                    <span className="text-gray-900 font-medium">Bs 3.50</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 3 - Margen de Ganancia (White with Green Border) */}
            <Card className="shadow-xl bg-white border-2 border-[#3BA935]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-[#3BA935]" />
                  </div>
                  <Badge
                    variant="outline"
                    className="border-[#3BA935] text-[#3BA935]"
                  >
                    Rentabilidad
                  </Badge>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Margen de Ganancia
                </h3>
                <div className="mb-2">
                  <p className="text-6xl font-bold text-[#3BA935]">
                    {profitMargin.toFixed(0)}%
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ganancia neta</span>
                      <span className="font-medium text-[#3BA935]">
                        Bs {(projectedRevenue - totalCosts).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tu producción es</span>
                      <span className="font-medium">
                        {profitMargin > 50 ? "Muy rentable 🎉" : "Rentable"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-sm text-blue-900">
                  💡 <strong>Consejo:</strong> Los gastos anuales se distribuyen
                  proporcionalmente entre todos tus ciclos de producción del año.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
