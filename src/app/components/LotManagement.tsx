import { useState } from "react";
import { Plus, MapPin, Calendar, TrendingUp, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RegisterLotModal } from "./RegisterLotModal";
import { useNavigate } from "react-router";
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
  status: "En Crecimiento" | "Cosechado" | "Planificado";
  totalCosts: number;
  projectedRevenue: number;
  image: string;
}

export function LotManagement() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lots, setLots] = useState<Lot[]>([
    {
      id: "1",
      code: "Lote Q-2025-A",
      crop: "Quinua Real",
      location: "Sica Sica",
      surfaceHa: 2.5,
      plantingDate: "2025-01-15",
      harvestDate: "2025-06-20",
      seedVariety: "Quinua Real Blanca",
      status: "En Crecimiento",
      totalCosts: 12500,
      projectedRevenue: 25000,
      image: quinuaImage,
    },
    {
      id: "2",
      code: "Lote Q-2024-B",
      crop: "Quinua Real",
      location: "Patacamaya",
      surfaceHa: 3.0,
      plantingDate: "2024-11-10",
      harvestDate: "2025-04-15",
      seedVariety: "Quinua Real Roja",
      status: "En Crecimiento",
      totalCosts: 18000,
      projectedRevenue: 36000,
      image: quinuaImage,
    },
  ]);

  const handleCreateLot = (lotData: Omit<Lot, "id" | "totalCosts" | "projectedRevenue" | "image">) => {
    const newLot: Lot = {
      ...lotData,
      id: Date.now().toString(),
      totalCosts: 0,
      projectedRevenue: 0,
      image: quinuaImage,
    };
    setLots([...lots, newLot]);
    setIsModalOpen(false);
  };

  const getStatusColor = (status: Lot["status"]) => {
    switch (status) {
      case "En Crecimiento":
        return "bg-[#3BA935]";
      case "Cosechado":
        return "bg-[#F7C331]";
      case "Planificado":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1>Gestión de Lotes</h1>
          <p className="text-muted-foreground">
            Administra tus lotes de cultivo de quinua y controla costos
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#3BA935] hover:bg-[#2E8B2A]"
        >
          <Plus className="mr-2 h-5 w-5" />
          Nueva Siembra
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lots.map((lot) => {
          const costPerHa = lot.surfaceHa > 0 ? lot.totalCosts / lot.surfaceHa : 0;
          const profit = lot.projectedRevenue - lot.totalCosts;
          const profitMargin = lot.totalCosts > 0 ? (profit / lot.totalCosts) * 100 : 0;

          return (
            <Card key={lot.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-40">
                <ImageWithFallback
                  src={lot.image}
                  alt={lot.code}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white">{lot.code}</h3>
                  <p className="text-white/90 text-sm">{lot.crop}</p>
                </div>
                <Badge className={`absolute top-3 right-3 ${getStatusColor(lot.status)}`}>
                  {lot.status}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Superficie: {lot.surfaceHa} Ha</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{lot.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Siembra: {new Date(lot.plantingDate).toLocaleDateString()}</span>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Costo Total:</span>
                    <span className="text-red-600">Bs {lot.totalCosts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Costo/Ha:</span>
                    <span className="text-[#3BA935]">Bs {costPerHa.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Margen:</span>
                    <span className={profitMargin > 0 ? "text-[#3BA935]" : "text-red-600"}>
                      {profitMargin.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#3BA935] hover:bg-[#2E8B2A] mt-4"
                  onClick={() => navigate(`/productor/lotes/${lot.id}`)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Dashboard
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {lots.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-muted-foreground">
            No hay lotes registrados
          </h3>
          <p className="text-muted-foreground">
            Comienza creando tu primera siembra
          </p>
        </div>
      )}

      <RegisterLotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateLot}
      />
    </div>
  );
}
