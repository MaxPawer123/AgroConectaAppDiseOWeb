import { useState } from "react";
import { Calculator, Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
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

interface CostItem {
  id: string;
  category: string;
  description: string;
  amount: number;
  quantity?: number;
  unit?: string;
}

export function CostCalculator() {
  const [costs, setCosts] = useState<CostItem[]>([
    { id: "1", category: "Semillas", description: "Semilla de papa", amount: 500, quantity: 1, unit: "qq" },
    { id: "2", category: "Abonos", description: "Fertilizante NPK", amount: 300, quantity: 0.5, unit: "qq" },
  ]);

  const [productionQuantity, setProductionQuantity] = useState("500");
  const [productionUnit, setProductionUnit] = useState("kg");
  const [sellingPrice, setSellingPrice] = useState("3.5");
  const [newCost, setNewCost] = useState({
    category: "Semillas",
    description: "",
    amount: "",
    quantity: "",
    unit: "kg",
  });

  // Categorías existentes + nuevas categorías detalladas
  const categories = [
    // Categorías existentes
    "Semillas",
    "Abonos",
    "Pesticidas",
    "Transporte",
    "Mano de obra",
    "Agua/Riego",
    "Herramientas",
    "Otros",
    // Nuevas categorías detalladas
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

  // Convertir quintales a kilogramos (1 quintal = 46 kg)
  const convertToKg = (quantity: number, unit: string) => {
    if (unit === "qq") {
      return quantity * 46;
    }
    return quantity;
  };

  const totalCosts = costs.reduce((sum, cost) => sum + cost.amount, 0);
  
  // Convertir la cantidad de producción a kg
  const quantityInKg = productionUnit === "qq" 
    ? Number(productionQuantity) * 46 
    : Number(productionQuantity) || 0;
  
  const price = Number(sellingPrice) || 0;
  const costPerKg = quantityInKg > 0 ? totalCosts / quantityInKg : 0;
  const totalRevenue = quantityInKg * price;
  const profit = totalRevenue - totalCosts;
  const profitMargin = totalCosts > 0 ? (profit / totalCosts) * 100 : 0;

  // Datos para el gráfico de Ingresos Proyectados
  const projectionData = [
    {
      name: "Escenario Pesimista",
      ingresos: totalRevenue * 0.7,
      costos: totalCosts,
      ganancia: totalRevenue * 0.7 - totalCosts,
    },
    {
      name: "Escenario Realista",
      ingresos: totalRevenue,
      costos: totalCosts,
      ganancia: profit,
    },
    {
      name: "Escenario Optimista",
      ingresos: totalRevenue * 1.3,
      costos: totalCosts,
      ganancia: totalRevenue * 1.3 - totalCosts,
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
      };
      setCosts([...costs, cost]);
      setNewCost({ category: "Semillas", description: "", amount: "", quantity: "", unit: "kg" });
    }
  };

  const deleteCost = (id: string) => {
    setCosts(costs.filter((c) => c.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1>Calculadora de Costos</h1>
        <p className="text-muted-foreground">
          Calcula tus gastos, ganancias y punto de equilibrio
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Cost Input */}
        <div className="lg:col-span-2 space-y-6">
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
                      <SelectItem value="header-existentes" disabled>
                        <span className="text-xs text-muted-foreground">--- Categorías Generales ---</span>
                      </SelectItem>
                      <SelectItem value="Semillas">Semillas</SelectItem>
                      <SelectItem value="Abonos">Abonos</SelectItem>
                      <SelectItem value="Pesticidas">Pesticidas</SelectItem>
                      <SelectItem value="Transporte">Transporte</SelectItem>
                      <SelectItem value="Mano de obra">Mano de obra</SelectItem>
                      <SelectItem value="Agua/Riego">Agua/Riego</SelectItem>
                      <SelectItem value="Herramientas">Herramientas</SelectItem>
                      <SelectItem value="Otros">Otros</SelectItem>
                      
                      <SelectItem value="header-detalladas" disabled>
                        <span className="text-xs text-muted-foreground">--- Categorías Detalladas ---</span>
                      </SelectItem>
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
              </div>
              <Button
                onClick={addCost}
                className="w-full bg-[#3BA935] hover:bg-[#2E8B2A]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Agregar Gasto
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {costs.map((cost) => (
                  <div
                    key={cost.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
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
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-[#3BA935]">Bs {cost.amount.toFixed(2)}</p>
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

          {/* Gráfico de Ingresos Proyectados */}
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
                    formatter={(value: number) => `Bs ${value.toFixed(2)}`}
                  />
                  <Legend />
                  <Bar dataKey="ingresos" fill="#3BA935" name="Ingresos" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="costos" fill="#E74C3C" name="Costos" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="ganancia" fill="#F7C331" name="Ganancia Neta" radius={[8, 8, 0, 0]} />
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

        {/* Right Column - Results */}
        <div className="space-y-6">
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
                <p className="text-2xl text-white">Bs {totalCosts.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Costo por Kilogramo</p>
                <p className="text-2xl text-white">Bs {costPerKg.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#F7C331] to-[#E0A800] text-white">
            <CardHeader>
              <CardTitle className="text-white">Ingresos Proyectados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm opacity-90">Ingresos Totales</p>
                <p className="text-2xl text-white">Bs {totalRevenue.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Ganancia Neta</p>
                <p className="text-2xl text-white flex items-center gap-2">
                  Bs {profit.toFixed(2)}
                  {profit > 0 ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <TrendingDown className="h-5 w-5" />
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className={profit > 0 ? "border-[#3BA935] border-2" : "border-destructive border-2"}>
            <CardHeader>
              <CardTitle>Margen de Ganancia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className={`text-4xl ${profit > 0 ? "text-[#3BA935]" : "text-destructive"}`}>
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

          <Card className="bg-muted">
            <CardHeader>
              <CardTitle>Punto de Equilibrio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-2">
                Para cubrir tus costos necesitas vender:
              </p>
              <p className="text-2xl text-[#3BA935]">
                {price > 0 ? (totalCosts / price).toFixed(0) : "0"} kg
              </p>
              {productionUnit === "qq" && price > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  ≈ {((totalCosts / price) / 46).toFixed(2)} qq
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
  );
}
