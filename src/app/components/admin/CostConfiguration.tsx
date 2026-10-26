import { useState } from "react";
import { Save, TrendingUp, DollarSign, Settings, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";
import { toast } from "sonner@2.0.3";

export function CostConfiguration() {
  // Variables de Mercado
  const [marketVariables, setMarketVariables] = useState({
    quinuaPrice: 450, // Bs por quintal
    dailyWage: 80, // Bs por jornal
    transportCost: 2.5, // Bs por km
    seedPrice: 180, // Bs por quintal
    fertilizerPrice: 250, // Bs por quintal
  });

  // Factores de Ajuste (Escenarios) - Representados como porcentajes
  const [adjustmentFactors, setAdjustmentFactors] = useState({
    drought: 20, // +20% de costo
    socialConflicts: 15, // +15% de costo
    frost: 25, // +25% de costo
    pests: 18, // +18% de costo
    marketDemand: -10, // -10% beneficio en precio
  });

  // Variables de Producción
  const [productionVariables, setProductionVariables] = useState({
    seedQuantityPerHa: 25, // kg por hectárea
    yieldPerHa: 18, // quintales por hectárea
    workDaysPerHa: 45, // jornales por hectárea
    harvestDays: 120, // días del ciclo
  });

  const handleSaveChanges = () => {
    // Aquí se guardarían los cambios en la base de datos
    toast.success("Configuración guardada", {
      description:
        "Las variables de costos han sido actualizadas exitosamente",
    });
  };

  const handleResetDefaults = () => {
    setMarketVariables({
      quinuaPrice: 450,
      dailyWage: 80,
      transportCost: 2.5,
      seedPrice: 180,
      fertilizerPrice: 250,
    });
    setAdjustmentFactors({
      drought: 20,
      socialConflicts: 15,
      frost: 25,
      pests: 18,
      marketDemand: -10,
    });
    setProductionVariables({
      seedQuantityPerHa: 25,
      yieldPerHa: 18,
      workDaysPerHa: 45,
      harvestDays: 120,
    });
    toast.info("Valores restablecidos", {
      description: "Se han restaurado los valores predeterminados",
    });
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Configuración de Variables de Costo</h1>
          <p className="text-muted-foreground">
            Gestiona las variables globales que afectan los cálculos de costos
            de producción
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleResetDefaults}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Restablecer
          </Button>
          <Button
            onClick={handleSaveChanges}
            className="bg-[#3BA935] hover:bg-[#2E8B2A]"
          >
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Columna Izquierda */}
        <div className="space-y-8">
          {/* Variables de Mercado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#3BA935]" />
                Variables de Mercado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Precio Quinua */}
              <div>
                <Label htmlFor="quinuaPrice">
                  Precio Referencial Quinua (Bs/quintal)
                </Label>
                <Input
                  id="quinuaPrice"
                  type="number"
                  value={marketVariables.quinuaPrice}
                  onChange={(e) =>
                    setMarketVariables({
                      ...marketVariables,
                      quinuaPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Precio promedio de mercado para quinua convencional
                </p>
              </div>

              <Separator />

              {/* Jornal Diario */}
              <div>
                <Label htmlFor="dailyWage">Jornal Diario (Bs/día)</Label>
                <Input
                  id="dailyWage"
                  type="number"
                  value={marketVariables.dailyWage}
                  onChange={(e) =>
                    setMarketVariables({
                      ...marketVariables,
                      dailyWage: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Costo de mano de obra por jornal de 8 horas
                </p>
              </div>

              <Separator />

              {/* Costo de Transporte */}
              <div>
                <Label htmlFor="transportCost">
                  Costo de Transporte (Bs/km)
                </Label>
                <Input
                  id="transportCost"
                  type="number"
                  step="0.1"
                  value={marketVariables.transportCost}
                  onChange={(e) =>
                    setMarketVariables({
                      ...marketVariables,
                      transportCost: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Costo promedio de transporte por kilómetro
                </p>
              </div>

              <Separator />

              {/* Precio Semilla */}
              <div>
                <Label htmlFor="seedPrice">Precio Semilla (Bs/quintal)</Label>
                <Input
                  id="seedPrice"
                  type="number"
                  value={marketVariables.seedPrice}
                  onChange={(e) =>
                    setMarketVariables({
                      ...marketVariables,
                      seedPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Precio de semilla certificada
                </p>
              </div>

              <Separator />

              {/* Precio Fertilizante */}
              <div>
                <Label htmlFor="fertilizerPrice">
                  Precio Fertilizante (Bs/quintal)
                </Label>
                <Input
                  id="fertilizerPrice"
                  type="number"
                  value={marketVariables.fertilizerPrice}
                  onChange={(e) =>
                    setMarketVariables({
                      ...marketVariables,
                      fertilizerPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Precio de fertilizante químico (Urea, Fosfato)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Variables de Producción */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#3BA935]" />
                Variables de Producción
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cantidad de Semilla */}
              <div>
                <Label htmlFor="seedQuantity">
                  Cantidad de Semilla (kg/hectárea)
                </Label>
                <Input
                  id="seedQuantity"
                  type="number"
                  value={productionVariables.seedQuantityPerHa}
                  onChange={(e) =>
                    setProductionVariables({
                      ...productionVariables,
                      seedQuantityPerHa: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-2"
                />
              </div>

              <Separator />

              {/* Rendimiento */}
              <div>
                <Label htmlFor="yieldPerHa">
                  Rendimiento Promedio (quintales/hectárea)
                </Label>
                <Input
                  id="yieldPerHa"
                  type="number"
                  value={productionVariables.yieldPerHa}
                  onChange={(e) =>
                    setProductionVariables({
                      ...productionVariables,
                      yieldPerHa: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-2"
                />
              </div>

              <Separator />

              {/* Jornales */}
              <div>
                <Label htmlFor="workDays">
                  Jornales por Hectárea (días)
                </Label>
                <Input
                  id="workDays"
                  type="number"
                  value={productionVariables.workDaysPerHa}
                  onChange={(e) =>
                    setProductionVariables({
                      ...productionVariables,
                      workDaysPerHa: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-2"
                />
              </div>

              <Separator />

              {/* Días de Cosecha */}
              <div>
                <Label htmlFor="harvestDays">Ciclo de Cultivo (días)</Label>
                <Input
                  id="harvestDays"
                  type="number"
                  value={productionVariables.harvestDays}
                  onChange={(e) =>
                    setProductionVariables({
                      ...productionVariables,
                      harvestDays: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna Derecha - Factores de Ajuste */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#3BA935]" />
                Factores de Ajuste (Escenarios)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <p className="text-sm text-muted-foreground">
                Estos factores se aplican automáticamente en la calculadora de
                costos cuando el productor selecciona un escenario adverso.
                Representan el incremento porcentual en costos.
              </p>

              {/* Sequía */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Sequía</Label>
                  <span className="text-sm">
                    +{adjustmentFactors.drought}%
                  </span>
                </div>
                <Slider
                  value={[adjustmentFactors.drought]}
                  onValueChange={(value) =>
                    setAdjustmentFactors({
                      ...adjustmentFactors,
                      drought: value[0],
                    })
                  }
                  min={0}
                  max={50}
                  step={1}
                  className="[&_[role=slider]]:bg-[#F7C331]"
                />
                <p className="text-xs text-muted-foreground">
                  Incremento en costos de riego y pérdida de rendimiento
                </p>
              </div>

              <Separator />

              {/* Conflictos Sociales */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Conflictos Sociales</Label>
                  <span className="text-sm">
                    +{adjustmentFactors.socialConflicts}%
                  </span>
                </div>
                <Slider
                  value={[adjustmentFactors.socialConflicts]}
                  onValueChange={(value) =>
                    setAdjustmentFactors({
                      ...adjustmentFactors,
                      socialConflicts: value[0],
                    })
                  }
                  min={0}
                  max={50}
                  step={1}
                  className="[&_[role=slider]]:bg-[#F7C331]"
                />
                <p className="text-xs text-muted-foreground">
                  Incremento en transporte por bloqueos o paros
                </p>
              </div>

              <Separator />

              {/* Heladas */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Heladas</Label>
                  <span className="text-sm">
                    +{adjustmentFactors.frost}%
                  </span>
                </div>
                <Slider
                  value={[adjustmentFactors.frost]}
                  onValueChange={(value) =>
                    setAdjustmentFactors({
                      ...adjustmentFactors,
                      frost: value[0],
                    })
                  }
                  min={0}
                  max={50}
                  step={1}
                  className="[&_[role=slider]]:bg-[#3BA935]"
                />
                <p className="text-xs text-muted-foreground">
                  Costos adicionales de protección y pérdida de cultivo
                </p>
              </div>

              <Separator />

              {/* Plagas */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Plagas y Enfermedades</Label>
                  <span className="text-sm">
                    +{adjustmentFactors.pests}%
                  </span>
                </div>
                <Slider
                  value={[adjustmentFactors.pests]}
                  onValueChange={(value) =>
                    setAdjustmentFactors({
                      ...adjustmentFactors,
                      pests: value[0],
                    })
                  }
                  min={0}
                  max={50}
                  step={1}
                  className="[&_[role=slider]]:bg-[#3BA935]"
                />
                <p className="text-xs text-muted-foreground">
                  Incremento por compra de pesticidas y tratamientos
                </p>
              </div>

              <Separator />

              {/* Demanda de Mercado */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Baja Demanda de Mercado</Label>
                  <span className="text-sm text-red-500">
                    {adjustmentFactors.marketDemand}%
                  </span>
                </div>
                <Slider
                  value={[Math.abs(adjustmentFactors.marketDemand)]}
                  onValueChange={(value) =>
                    setAdjustmentFactors({
                      ...adjustmentFactors,
                      marketDemand: -value[0],
                    })
                  }
                  min={0}
                  max={30}
                  step={1}
                  className="[&_[role=slider]]:bg-red-500"
                />
                <p className="text-xs text-muted-foreground">
                  Reducción en precio de venta por baja demanda
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Vista Previa de Impacto */}
          <Card className="bg-gradient-to-br from-[#E8F5E9] to-white">
            <CardHeader>
              <CardTitle>Vista Previa de Impacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-sm text-muted-foreground mb-2">
                  Costo base de producción (1 hectárea)
                </p>
                <p className="text-2xl text-[#3BA935]">
                  Bs{" "}
                  {(
                    marketVariables.seedPrice * 0.25 +
                    marketVariables.dailyWage * productionVariables.workDaysPerHa +
                    marketVariables.fertilizerPrice * 2
                  ).toFixed(2)}
                </p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-muted-foreground mb-2">
                  Con escenario de sequía (+{adjustmentFactors.drought}%)
                </p>
                <p className="text-2xl text-yellow-600">
                  Bs{" "}
                  {(
                    (marketVariables.seedPrice * 0.25 +
                      marketVariables.dailyWage *
                        productionVariables.workDaysPerHa +
                      marketVariables.fertilizerPrice * 2) *
                    (1 + adjustmentFactors.drought / 100)
                  ).toFixed(2)}
                </p>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-muted-foreground mb-2">
                  Ingreso estimado (precio actual)
                </p>
                <p className="text-2xl text-red-600">
                  Bs{" "}
                  {(
                    marketVariables.quinuaPrice * productionVariables.yieldPerHa
                  ).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
