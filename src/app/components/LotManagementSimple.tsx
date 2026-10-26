import { useState } from "react";
import { Plus, MapPin, Calendar, Sprout, TrendingUp, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RegisterLotModal } from "./RegisterLotModal";
import { Progress } from "./ui/progress";
import quinuaImage from "figma:asset/d70a8a4876d7ebf558541a0290f27e39f8579cc7.png";

export interface Lot {
  id: string;
  code: string;
  crop: string;
  location: string;
  surfaceHa: number;
  plantingDate: string;
  harvestDate: string;
  seedVariety: string;
  status: "En Crecimiento" | "Cosechado" | "Planificado" | "Siembra Reciente";
  totalCosts: number;
  projectedRevenue: number;
  image: string;
  progress: number;
  currentPhase: string;
}

interface LotManagementSimpleProps {
  onNavigateToCalculator: (lotId: string, lotCode: string) => void;
}

export function LotManagementSimple({ onNavigateToCalculator }: LotManagementSimpleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [lots, setLots] = useState<Lot[]>([
    {
      id: "1",
      code: "Q-2025",
      crop: "Lote Quinua Real",
      location: "Comunidad Villa Remedios",
      surfaceHa: 2.5,
      plantingDate: "01 Sep 2024",
      harvestDate: "Mar 2025",
      seedVariety: "Quinua Real Blanca",
      status: "En Crecimiento",
      totalCosts: 9700,
      projectedRevenue: 35000,
      image: quinuaImage,
      progress: 60,
      currentPhase: "Floración",
    },
    {
      id: "2",
      code: "Q-2024-B",
      crop: "Lote Quinua Roja",
      location: "Comunidad Villa Remedios",
      surfaceHa: 1.8,
      plantingDate: "01 Sep 2024",
      harvestDate: "Feb 2025",
      seedVariety: "Quinua Roja Pasankalla",
      status: "Planificado",
      totalCosts: 8200,
      projectedRevenue: 28000,
      image: quinuaImage,
      progress: 80,
      currentPhase: "Maduración",
    },
    {
      id: "3",
      code: "Q-2025-C",
      crop: "Lote Quinua Negra",
      location: "Comunidad Villa Remedios",
      surfaceHa: 3.0,
      plantingDate: "20 Nov 2024",
      harvestDate: "Abr 2025",
      seedVariety: "Quinua Negra Collana",
      status: "Siembra Reciente",
      totalCosts: 4500,
      projectedRevenue: 42000,
      image: quinuaImage,
      progress: 25,
      currentPhase: "Germinación",
    },
  ]);

  const handleAddLot = (lotData: Omit<Lot, "id" | "image" | "progress" | "currentPhase" | "totalCosts" | "projectedRevenue">) => {
    const newLot: Lot = {
      ...lotData,
      id: Date.now().toString(),
      image: quinuaImage,
      progress: 0,
      currentPhase: "Siembra",
      totalCosts: 0,
      projectedRevenue: 0,
    };
    setLots([...lots, newLot]);
    setIsModalOpen(false);
  };

  // Cálculos de KPIs
  const activeLots = lots.filter(l => l.status === "En Crecimiento" || l.status === "Siembra Reciente").length;
  const totalArea = lots.reduce((sum, lot) => sum + lot.surfaceHa, 0);
  const totalInvestment = lots.reduce((sum, lot) => sum + lot.totalCosts, 0);
  const totalProjectedRevenue = lots.reduce((sum, lot) => sum + lot.projectedRevenue, 0);

  // Función para obtener el color del badge según el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Crecimiento":
        return "bg-[#3BA935] text-white";
      case "Planificado":
        return "bg-[#F7C331] text-black";
      case "Siembra Reciente":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1>Mis Lotes de Quinua</h1>
          <p className="text-muted-foreground">
            Gestiona tus cultivos de quinua, costos y proyecciones financieras
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#3BA935] hover:bg-[#2E8B2A]"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Registrar Nueva Siembra
        </Button>
      </div>

      {/* KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Lotes Activos */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Lotes Activos</p>
                <p className="text-3xl text-[#3BA935]">{activeLots} Lotes</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-[#3BA935]/10 flex items-center justify-center">
                <Sprout className="h-5 w-5 text-[#3BA935]" />
              </div>
            </div>
            <div className="mt-2">
              <TrendingUp className="h-4 w-4 text-[#3BA935] inline mr-1" />
              <span className="text-xs text-muted-foreground">En producción</span>
            </div>
          </CardContent>
        </Card>

        {/* Área Total */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Área Total</p>
                <p className="text-3xl text-blue-600">{totalArea.toFixed(1)} Ha</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                <Share2 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <TrendingUp className="h-4 w-4 text-blue-600 inline mr-1" />
              <span className="text-xs text-muted-foreground">Bajo cultivo</span>
            </div>
          </CardContent>
        </Card>

        {/* Inversión Total */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Inversión Total</p>
                <p className="text-3xl text-orange-600">Bs {totalInvestment.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-orange-600/10 flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-muted-foreground">Gastos acumulados</span>
            </div>
          </CardContent>
        </Card>

        {/* Ingresos Proyectados */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Ingresos Proyectados</p>
                <p className="text-3xl text-purple-600">Bs {totalProjectedRevenue.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-600/10 flex items-center justify-center">
                <span className="text-2xl">💵</span>
              </div>
            </div>
            <div className="mt-2">
              <TrendingUp className="h-4 w-4 text-purple-600 inline mr-1" />
              <span className="text-xs text-muted-foreground">Estimación total</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {lots.map((lot) => {
          const profitMargin = lot.totalCosts > 0 
            ? ((lot.projectedRevenue - lot.totalCosts) / lot.totalCosts) * 100 
            : 0;

          return (
            <Card key={lot.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Imagen del Lote */}
              <div className="relative h-48">
                <ImageWithFallback
                  src={lot.image}
                  alt={lot.code}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Badge de Estado */}
                <Badge className={`absolute top-3 right-3 ${getStatusColor(lot.status)}`}>
                  {lot.status}
                </Badge>

                {/* Código del Lote */}
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-xs opacity-80">Código: {lot.code}</p>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                {/* Título */}
                <h3 className="text-lg">{lot.crop}</h3>
                <p className="text-sm text-muted-foreground">{lot.seedVariety}</p>

                {/* Detalles */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Share2 className="h-4 w-4 text-blue-600" />
                    <span>Área: {lot.surfaceHa} Ha</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-[#3BA935]" />
                    <span>{lot.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-orange-600" />
                    <span>Siembra: {lot.plantingDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span>Cosecha est.: {lot.harvestDate}</span>
                  </div>
                </div>

                {/* Progreso del Ciclo */}
                <div className="pt-3 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progreso del Ciclo</span>
                    <span className="text-[#3BA935]">{lot.progress}%</span>
                  </div>
                  <Progress value={lot.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">Fase actual: {lot.currentPhase}</p>
                </div>

                {/* Financiero */}
                <div className="pt-3 border-t grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Inversión</p>
                    <p className="text-red-600">Bs {lot.totalCosts.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-xs mb-1">Proyección</p>
                    <p className="text-[#3BA935]">Bs {lot.projectedRevenue.toLocaleString()}</p>
                  </div>
                </div>

                {/* Botones */}
                <div className="pt-3">
                  <Button
                    className="w-full bg-[#3BA935] hover:bg-[#2E8B2A]"
                    size="sm"
                    onClick={() => onNavigateToCalculator(lot.id, lot.code)}
                  >
                    <Share2 className="mr-1 h-4 w-4" />
                    Gestionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <RegisterLotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddLot}
      />
    </div>
  );
}