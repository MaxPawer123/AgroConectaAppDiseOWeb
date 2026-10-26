import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
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
import { ImageWithFallback } from "./figma/ImageWithFallback";
import quinuaImage from "figma:asset/d70a8a4876d7ebf558541a0290f27e39f8579cc7.png";

interface RegisterLotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lotData: {
    code: string;
    crop: string;
    location: string;
    surfaceHa: number;
    plantingDate: string;
    harvestDate: string;
    seedVariety: string;
    status: "En Crecimiento" | "Cosechado" | "Planificado" | "Siembra Reciente";
  }) => void;
}

export function RegisterLotModal({ isOpen, onClose, onSubmit }: RegisterLotModalProps) {
  const [formData, setFormData] = useState({
    code: "",
    crop: "Quinua Real",
    location: "",
    surfaceHa: "",
    plantingDate: "",
    harvestDate: "",
    seedVariety: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      surfaceHa: Number(formData.surfaceHa),
      status: "En Crecimiento",
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      code: "",
      crop: "Quinua Real",
      location: "",
      surfaceHa: "",
      plantingDate: "",
      harvestDate: "",
      seedVariety: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            🌱 Nueva Siembra / Iniciar Lote
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selector de Rubro con Imagen */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <Label>Rubro / Cultivo</Label>
            <div className="flex items-center gap-4 mt-2">
              <ImageWithFallback
                src={quinuaImage}
                alt="Quinua Real"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <Select
                  value={formData.crop}
                  onValueChange={(value) => setFormData({ ...formData, crop: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Quinua Real">🌾 Quinua Real</SelectItem>
                    <SelectItem value="Quinua Blanca">🌾 Quinua Blanca</SelectItem>
                    <SelectItem value="Quinua Roja">🌾 Quinua Roja</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Cultivo principal del altiplano boliviano
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="code">Nombre/Código del Lote *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Ej: Lote Q-2025-A"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Identificador único para tu lote
              </p>
            </div>

            <div>
              <Label htmlFor="location">Ubicación *</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sica Sica">📍 Sica Sica</SelectItem>
                  <SelectItem value="Patacamaya">📍 Patacamaya</SelectItem>
                  <SelectItem value="Umala">📍 Umala</SelectItem>
                  <SelectItem value="Ayo Ayo">📍 Ayo Ayo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="surface">Superficie (CRÍTICO) *</Label>
              <div className="relative">
                <Input
                  id="surface"
                  type="number"
                  step="0.01"
                  value={formData.surfaceHa}
                  onChange={(e) => setFormData({ ...formData, surfaceHa: e.target.value })}
                  placeholder="2.5"
                  required
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  Ha
                </span>
              </div>
              <p className="text-xs text-amber-600 mt-1">
                ⚠️ Vital para calcular el costo por hectárea
              </p>
            </div>

            <div>
              <Label htmlFor="plantingDate">Fecha de Siembra *</Label>
              <Input
                id="plantingDate"
                type="date"
                value={formData.plantingDate}
                onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="harvestDate">Fecha Estimada de Cosecha *</Label>
              <Input
                id="harvestDate"
                type="date"
                value={formData.harvestDate}
                onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="seedVariety">Variedad de Semilla *</Label>
              <Input
                id="seedVariety"
                value={formData.seedVariety}
                onChange={(e) => setFormData({ ...formData, seedVariety: e.target.value })}
                placeholder="Ej: Quinua Real Blanca, Pasankalla, Sajama"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Especifica la variedad exacta que sembraste
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#3BA935] hover:bg-[#2E8B2A]">
              ✨ Crear Lote y Comenzar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}