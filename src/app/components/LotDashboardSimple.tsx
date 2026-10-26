import { useState } from "react";
import { ArrowLeft, Plus, Calendar, MapPin, Sprout, TrendingUp, Calculator } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RegisterCostModal } from "./RegisterCostModal";
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
import quinuaImage from "figma:asset/d70a8a4876d7ebf558541a0290f27e39f8579cc7.png";

export interface LotCost {
  id: string;
  lotId: string;
  category: string;
  subcategory: string;
  description: string;
  unitCost: number;
  quantity: number;
  total: number;
  date: string;
  receipt?: string;
}

interface LotDashboardSimpleProps {
  lotId: string;
  onBack: () => void;
}

export function LotDashboardSimple({ lotId, onBack }: LotDashboardSimpleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data del lote
  const lot = {
    id: lotId,
    code: "Lote Q-2025-A",
    crop: "Quinua Real",
    location: "Sica Sica",
    surfaceHa: 2.5,
    plantingDate: "2025-01-15",
    harvestDate: "2025-06-20",
    seedVariety: "Quinua Real Blanca",
    status: "En Crecimiento",
    image: quinuaImage,
    // Cálculo del progreso del ciclo (en días)
    daysPlanted: 46, // días desde la siembra
    totalCycleDays: 157, // días totales del ciclo
  };

  const [costs, setCosts] = useState<LotCost[]>([
    {
      id: "1",
      lotId: lotId,
      category: "Maquinaria",
      subcategory: "Roturado",
      description: "Tractor para roturado de terreno",
      unitCost: 800,
      quantity: 3,
      total: 2400,
      date: "2025-01-10",
    },
    {
      id: "2",
      lotId: lotId,
      category: "Mano de obra",
      subcategory: "Para Siembra",
      description: "Jornales para siembra manual",
      unitCost: 100,
      quantity: 15,
      total: 1500,
      date: "2025-01-15",
    },
    {
      id: "3",
      lotId: lotId,
      category: "Fertilizantes",
      subcategory: "Químicos",
      description: "Fertilizante NPK 15-15-15",
      unitCost: 250,
      quantity: 10,
      total: 2500,
      date: "2025-01-20",
    },
    {
      id: "4",
      lotId: lotId,
      category: "Mano de obra",
      subcategory: "Labores Culturales",
      description: "Deshierbe y control fitosanitario",
      unitCost: 100,
      quantity: 20,
      total: 2000,
      date: "2025-02-10",
    },
    {
      id: "5",
      lotId: lotId,
      category: "Fertilizantes",
      subcategory: "Orgánicos",
      description: "Biol orgánico para foliar",
      unitCost: 150,
      quantity: 8,
      total: 1200,
      date: "2025-02-15",
    },
  ]);

  const totalCosts = costs.reduce((sum, cost) => sum + cost.total, 0);
  const costPerHa = lot.surfaceHa > 0 ? totalCosts / lot.surfaceHa : 0;
  
  // Estimación de ingresos: 30 quintales/ha * 46 kg/qq * Bs 8/kg
  const estimatedYieldPerHa = 30; // quintales
  const kgPerQuintal = 46;
  const pricePerKg = 8;
  const projectedRevenue = lot.surfaceHa * estimatedYieldPerHa * kgPerQuintal * pricePerKg;
  const profit = projectedRevenue - totalCosts;
  const profitMargin = totalCosts > 0 ? (profit / totalCosts) * 100 : 0;

  // Datos para el gráfico
  const chartData = [
    {
      name: "Actual",
      Ingresos: projectedRevenue,
      Costos: totalCosts,
      Ganancia: profit,
    },
  ];

  // Agrupar costos por categoría
  const costsByCategory = costs.reduce((acc, cost) => {
    const key = `${cost.category} - ${cost.subcategory}`;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += cost.total;
    return acc;
  }, {} as Record<string, number>);

  const handleAddCost = (costData: Omit<LotCost, "id" | "lotId" | "total">) => {
    const newCost: LotCost = {
      ...costData,
      id: Date.now().toString(),
      lotId: lotId,
      total: costData.unitCost * costData.quantity,
    };
    setCosts([...costs, newCost]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header del Lote con Imagen Panorámica */}
      <div className="relative h-64 bg-gradient-to-r from-[#3BA935] to-[#2E8B2A]">
        <ImageWithFallback
          src={lot.image}
          alt={lot.code}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-between py-6">
          <Button
            variant="ghost"
            className="self-start text-white hover:bg-white/20"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Volver a Lotes
          </Button>

          <div className="text-white">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-white">{lot.code}</h1>
              <Badge className="bg-[#3BA935] border-white">
                {lot.status}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{lot.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sprout className="h-4 w-4" />
                <span>{lot.crop}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Siembra: {new Date(lot.plantingDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Superficie: {lot.surfaceHa} Ha</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de Finanzas - Resumen */}
          <div className="lg:col-span-2 space-y-6">
            {/* KPIs Principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                <CardHeader>
                  <CardTitle className="text-sm text-white/90">Costo Total Acumulado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl text-white">Bs {totalCosts.toLocaleString()}</p>
                  <p className="text-xs text-white/80 mt-1">{costs.length} gastos registrados</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#3BA935] to-[#2E8B2A] text-white">
                <CardHeader>
                  <CardTitle className="text-sm text-white/90">Costo por Hectárea</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    <p className="text-3xl text-white">Bs {costPerHa.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <p className="text-xs text-white/80 mt-1">Promedio/Ha</p>
                </CardContent>
              </Card>

              <Card className={`${profit > 0 ? 'bg-gradient-to-br from-[#F7C331] to-[#E0A800]' : 'bg-gradient-to-br from-gray-500 to-gray-600'} text-white`}>
                <CardHeader>
                  <CardTitle className="text-sm text-white/90">Margen Proyectado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl text-white">{profitMargin.toFixed(1)}%</p>
                  <p className="text-xs text-white/80 mt-1">
                    {profit > 0 ? `+Bs ${profit.toLocaleString()}` : `Bs ${profit.toLocaleString()}`}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de Ingresos vs Costos */}
            <Card>
              <CardHeader>
                <CardTitle>📊 Ingresos Proyectados vs. Costos Reales</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
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
                    <Bar dataKey="Ganancia" fill="#F7C331" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    💡 <strong>Proyección:</strong> Basada en rendimiento estimado de {estimatedYieldPerHa} qq/ha y precio Bs {pricePerKg}/kg
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Historial de Costos */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>📝 Historial de Costos de este Lote</CardTitle>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#3BA935] hover:bg-[#2E8B2A]"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Registrar Costo
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-3 text-sm">Fecha</th>
                        <th className="text-left p-3 text-sm">Categoría</th>
                        <th className="text-left p-3 text-sm">Descripción</th>
                        <th className="text-right p-3 text-sm">Cantidad</th>
                        <th className="text-right p-3 text-sm">Costo Unit.</th>
                        <th className="text-right p-3 text-sm">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costs.map((cost) => (
                        <tr key={cost.id} className="border-b hover:bg-muted/50">
                          <td className="p-3 text-sm">{new Date(cost.date).toLocaleDateString()}</td>
                          <td className="p-3 text-sm">
                            <div>
                              <p>{cost.category}</p>
                              <p className="text-xs text-muted-foreground">{cost.subcategory}</p>
                            </div>
                          </td>
                          <td className="p-3 text-sm">{cost.description}</td>
                          <td className="p-3 text-sm text-right">{cost.quantity}</td>
                          <td className="p-3 text-sm text-right">Bs {cost.unitCost.toLocaleString()}</td>
                          <td className="p-3 text-sm text-right text-[#3BA935]">
                            Bs {cost.total.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel Lateral - Resumen por Categoría */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Costos por Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(costsByCategory).map(([category, total]) => (
                    <div key={category} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm">{category}</p>
                      </div>
                      <p className="text-[#3BA935]">Bs {total.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle>📋 Detalles del Lote</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Variedad:</span>
                  <span>{lot.seedVariety}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cosecha estimada:</span>
                  <span>{new Date(lot.harvestDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rendimiento est.:</span>
                  <span>{estimatedYieldPerHa} qq/ha</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Producción total est.:</span>
                  <span>{(lot.surfaceHa * estimatedYieldPerHa).toFixed(1)} qq</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAB - Floating Action Button */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-[#3BA935] hover:bg-[#2E8B2A] shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <RegisterCostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCost}
        lotCode={lot.code}
      />
    </div>
  );
}