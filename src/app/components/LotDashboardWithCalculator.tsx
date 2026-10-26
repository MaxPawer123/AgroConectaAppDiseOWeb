import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Calculator, TrendingUp, TrendingDown } from "lucide-react";
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LotDashboardWithCalculatorProps {
  lotId: string;
  lotCode: string;
  onBack: () => void;
}

interface CostItem {
  id: string;
  category: string;
  description: string;
  amount: number;
  quantity?: number;
  unit?: string;
  paymentMode?: "cycle" | "annual";
}

export function LotDashboardWithCalculator({ 
  lotId, 
  lotCode, 
  onBack 
}: LotDashboardWithCalculatorProps) {
  const [costs, setCosts] = useState<CostItem[]>([
    { 
      id: "1", 
      category: "Semillas", 
      description: "Semilla de quinua", 
      amount: 500, 
      quantity: 1, 
      unit: "qq" 
    },
    { 
      id: "2", 
      category: "Fertilizantes químicos", 
      description: "Fertilizante NPK", 
      amount: 300, 
      quantity: 0.5, 
      unit: "qq" 
    },
  ]);

  const [productionQuantity, setProductionQuantity] = useState("500");
  const [productionUnit, setProductionUnit] = useState("kg");
  const [sellingPrice, setSellingPrice] = useState("3.5");
  const [newCost, setNewCost] = useState({
    category: "Alquiler de Terreno",
    description: "",
    amount: "",
    quantity: "",
    unit: "ha",
    paymentMode: "cycle" as "cycle" | "annual",
  });

  // Categorías
  const categories = [
    "Alquiler de Terreno",
    "Semillas",
    "Abonos",
    "Pesticidas",
    "Transporte",
    "Mano de obra",
    "Agua/Riego",
    "Herramientas",
    "Otros",
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

  // Convertir quintales a kilogramos
  const convertToKg = (quantity: number, unit: string) => {
    if (unit === "qq") {
      return quantity * 46;
    }
    return quantity;
  };

  const totalCosts = costs.reduce((sum, cost) => sum + cost.amount, 0);
  
  const quantityInKg = productionUnit === "qq" 
    ? Number(productionQuantity) * 46 
    : Number(productionQuantity) || 0;
  
  const price = Number(sellingPrice) || 0;
  const costPerKg = quantityInKg > 0 ? totalCosts / quantityInKg : 0;
  const totalRevenue = quantityInKg * price;
  const profit = totalRevenue - totalCosts;
  const profitMargin = totalCosts > 0 ? (profit / totalCosts) * 100 : 0;

  // Punto de equilibrio
  const breakEvenKg = price > 0 ? totalCosts / price : 0;
  const breakEvenQq = breakEvenKg / 46;

  // Datos para el gráfico
  const projectionData = [
    {
      name: "Escenario Pesimista",
      Ingresos: totalRevenue * 0.7,
      Costos: totalCosts,
      "Ganancia Neta": totalRevenue * 0.7 - totalCosts,
    },
    {
      name: "Escenario Realista",
      Ingresos: totalRevenue,
      Costos: totalCosts,
      "Ganancia Neta": profit,
    },
    {
      name: "Escenario Optimista",
      Ingresos: totalRevenue * 1.3,
      Costos: totalCosts,
      "Ganancia Neta": totalRevenue * 1.3 - totalCosts,
    },
  ];

  const addCost = () => {
    if (newCost.description && newCost.amount) {
      const cost: CostItem = {
        id: Date.now().toString(),
        category: newCost.category,
        description: newCost.description,
        amount: Number(newCost.amount),
        quantity: Number(newCost.quantity) || undefined,
        unit: newCost.quantity ? newCost.unit : undefined,
        paymentMode: newCost.paymentMode,
      };
      setCosts([...costs, cost]);
      setNewCost({ category: "Alquiler de Terreno", description: "", amount: "", quantity: "", unit: "ha", paymentMode: "cycle" });
    }
  };

  const deleteCost = (id: string) => {
    setCosts(costs.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Compacto */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onBack}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Volver a Lotes
              </Button>
              <div className="border-l pl-4">
                <h1 className="text-2xl">Calculadora de Costos</h1>
                <p className="text-sm text-muted-foreground">
                  Calcula tus gastos, ganancias y punto de equilibrio - {lotCode}
                </p>
              </div>
            </div>
            <Badge className="bg-[#3BA935] text-white text-base px-4 py-2">
              {lotCode}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna Izquierda */}
          <div className="lg:col-span-2 space-y-6">
            {/* Registrar Gastos */}
            <Card>
              <CardHeader>
                <CardTitle>Registrar Gastos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Categoría</Label>
                    <Select
                      value={newCost.category}
                      onValueChange={(value) =>
                        setNewCost({ ...newCost, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alquiler de Terreno">🏞️ Alquiler de Terreno</SelectItem>
                        <SelectItem value="Semillas">Semillas</SelectItem>
                        <SelectItem value="Abonos">Abonos</SelectItem>
                        <SelectItem value="Pesticidas">Pesticidas</SelectItem>
                        <SelectItem value="Transporte">Transporte</SelectItem>
                        <SelectItem value="Mano de obra">Mano de obra</SelectItem>
                        <SelectItem value="Agua/Riego">Agua/Riego</SelectItem>
                        <SelectItem value="Herramientas">Herramientas</SelectItem>
                        <SelectItem value="Otros">Otros</SelectItem>
                        <SelectItem value="Maquinaria para Roturar">🚜 Maquinaria para Roturar</SelectItem>
                        <SelectItem value="Maquinaria para Siembra">🚜 Maquinaria para Siembra</SelectItem>
                        <SelectItem value="Maquinaria para Cosecha">🚜 Maquinaria para Cosecha</SelectItem>
                        <SelectItem value="Mano de obra para roturar">👷 Mano de obra para roturar</SelectItem>
                        <SelectItem value="Mano de obra para siembra">👷 Mano de obra para siembra</SelectItem>
                        <SelectItem value="Mano de obra para labores culturales">👷 Mano de obra labores culturales</SelectItem>
                        <SelectItem value="Mano de obra para cosecha">👷 Mano de obra para cosecha</SelectItem>
                        <SelectItem value="Fertilizantes químicos">🌱 Fertilizantes químicos</SelectItem>
                        <SelectItem value="Fertilizantes orgánicos">🌱 Fertilizantes orgánicos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Descripción</Label>
                    <Input
                      value={newCost.description}
                      onChange={(e) =>
                        setNewCost({ ...newCost, description: e.target.value })
                      }
                      placeholder="Ej: Semilla certificada"
                    />
                  </div>
                  <div>
                    <Label>Cantidad (opcional)</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={newCost.quantity}
                        onChange={(e) =>
                          setNewCost({ ...newCost, quantity: e.target.value })
                        }
                        placeholder="0"
                        className="flex-1"
                      />
                      <Select
                        value={newCost.unit}
                        onValueChange={(value) =>
                          setNewCost({ ...newCost, unit: value })
                        }
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="qq">qq</SelectItem>
                          <SelectItem value="ha">ha</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Monto (Bs)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newCost.amount}
                      onChange={(e) =>
                        setNewCost({ ...newCost, amount: e.target.value })
                      }
                      placeholder="0.00"
                    />
                  </div>
                  
                  {/* Modalidad de Pago - Solo para Alquiler de Terreno */}
                  {newCost.category === "Alquiler de Terreno" && (
                    <div className="md:col-span-4">
                      <Label>Modalidad de Pago</Label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <button
                          type="button"
                          onClick={() => setNewCost({ ...newCost, paymentMode: "cycle" })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            newCost.paymentMode === "cycle"
                              ? "border-[#3BA935] bg-[#E8F5E9] text-[#3BA935]"
                              : "border-gray-300 bg-white hover:border-gray-400"
                          }`}
                        >
                          <div className="text-center">
                            <p className="font-medium">Por Ciclo</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Solo esta cosecha
                            </p>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewCost({ ...newCost, paymentMode: "annual" })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            newCost.paymentMode === "annual"
                              ? "border-[#F7C331] bg-[#FFF9E6] text-[#F7C331]"
                              : "border-gray-300 bg-white hover:border-gray-400"
                          }`}
                        >
                          <div className="text-center">
                            <p className="font-medium">Anual</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Todo el año
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <Button
                      onClick={addCost}
                      className="w-full bg-[#3BA935] hover:bg-[#2E8B2A]"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Agregar Gasto
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Gastos */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Gastos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {costs.map((cost) => (
                    <div
                      key={cost.id}
                      className="flex items-center justify-between p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex-1">
                        <p>{cost.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {cost.category}
                          {cost.quantity && cost.unit && (
                            <span className="ml-2">
                              • {cost.quantity} {cost.unit}
                              {cost.unit === "qq" && (
                                <span className="text-xs ml-1">
                                  ({convertToKg(cost.quantity, cost.unit)} kg)
                                </span>
                              )}
                            </span>
                          )}
                          {cost.paymentMode && (
                            <Badge
                              variant="outline"
                              className={`ml-2 text-xs ${
                                cost.paymentMode === "annual"
                                  ? "border-[#F7C331] text-[#F7C331]"
                                  : "border-[#3BA935] text-[#3BA935]"
                              }`}
                            >
                              {cost.paymentMode === "annual" ? "Anual" : "Por Ciclo"}
                            </Badge>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-[#3BA935] text-lg">
                          Bs {cost.amount.toLocaleString()}
                        </p>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteCost(cost.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {costs.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No hay gastos registrados
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Datos de Producción */}
            <Card>
              <CardHeader>
                <CardTitle>Datos de Producción</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cantidad Producida</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={productionQuantity}
                        onChange={(e) => setProductionQuantity(e.target.value)}
                        placeholder="500"
                        className="flex-1"
                      />
                      <Select
                        value={productionUnit}
                        onValueChange={setProductionUnit}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="qq">qq</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {productionUnit === "qq" && productionQuantity && (
                      <p className="text-xs text-muted-foreground mt-1">
                        = {(Number(productionQuantity) * 46).toFixed(2)} kg
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Precio de Venta (Bs/kg)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                      placeholder="3.50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proyección de Ingresos */}
            <Card>
              <CardHeader>
                <CardTitle>Proyección de Ingresos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#666" />
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
                    <Bar dataKey="Ingresos" fill="#3BA935" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Costos" fill="#E74C3C" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Ganancia Neta" fill="#F7C331" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    💡 <strong>Escenarios:</strong> Pesimista (70%), Realista (100%), Optimista (130%)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha - Resúmenes */}
          <div className="space-y-6">
            {/* Resumen Financiero */}
            <Card className="bg-gradient-to-br from-[#3BA935] to-[#2E8B2A] text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Calculator className="h-5 w-5" />
                  Resumen Financiero
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm opacity-90">Total Costos</p>
                  <p className="text-3xl text-white">Bs {totalCosts.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Costo por Kilogramo</p>
                  <p className="text-3xl text-white">Bs {costPerKg.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Ingresos Proyectados */}
            <Card className="bg-gradient-to-br from-[#F7C331] to-[#E0A800] text-white">
              <CardHeader>
                <CardTitle className="text-white">Ingresos Proyectados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm opacity-90">Ingresos Totales</p>
                  <p className="text-3xl text-white">Bs {totalRevenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Ganancia Neta</p>
                  <p className="text-3xl text-white flex items-center gap-2">
                    Bs {profit.toLocaleString()}
                    {profit > 0 ? (
                      <TrendingUp className="h-5 w-5" />
                    ) : (
                      <TrendingDown className="h-5 w-5" />
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Margen de Ganancia */}
            <Card className={profit > 0 ? "border-[#3BA935] border-2" : "border-destructive border-2"}>
              <CardHeader>
                <CardTitle>Margen de Ganancia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className={`text-5xl ${profit > 0 ? "text-[#3BA935]" : "text-destructive"}`}>
                    {profitMargin.toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {profit > 0
                      ? "Tu producción es rentable"
                      : "Revisa tus costos o precio de venta"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Punto de Equilibrio */}
            <Card className="bg-muted">
              <CardHeader>
                <CardTitle>Punto de Equilibrio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-2">
                  Para cubrir tus costos necesitas vender:
                </p>
                <p className="text-3xl text-[#3BA935]">
                  {breakEvenKg.toFixed(0)} kg
                </p>
                {productionUnit === "qq" && (
                  <p className="text-sm text-muted-foreground mt-1">
                    ≈ {breakEvenQq.toFixed(2)} qq
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  a Bs {price.toFixed(2)} por kg
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}