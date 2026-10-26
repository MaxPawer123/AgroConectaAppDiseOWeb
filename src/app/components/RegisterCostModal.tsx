import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Upload, AlertCircle } from "lucide-react";

interface RegisterCostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (costData: {
    category: string;
    subcategory: string;
    description: string;
    unitCost: number;
    quantity: number;
    date: string;
    receipt?: string;
  }) => void;
  lotCode: string;
}

// Categorías jerárquicas según el requerimiento del Ingeniero
const costCategories = {
  "Maquinaria": {
    icon: "🚜",
    subcategories: ["Roturado", "Siembra", "Cosecha"],
  },
  "Mano de obra": {
    icon: "👷🏽",
    subcategories: ["Para Roturar", "Para Siembra", "Labores Culturales", "Cosecha"],
  },
  "Fertilizantes": {
    icon: "🧪",
    subcategories: ["Químicos", "Orgánicos/Biol"],
  },
  "Logística": {
    icon: "🚚",
    subcategories: ["Transporte"],
  },
};

export function RegisterCostModal({ isOpen, onClose, onSubmit, lotCode }: RegisterCostModalProps) {
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    description: "",
    unitCost: "",
    quantity: "",
    date: new Date().toISOString().split('T')[0],
  });

  const [calculatedTotal, setCalculatedTotal] = useState(0);

  const handleCategoryChange = (category: string) => {
    setFormData({ ...formData, category, subcategory: "" });
  };

  const handleCalculateTotal = () => {
    const unit = Number(formData.unitCost) || 0;
    const qty = Number(formData.quantity) || 0;
    setCalculatedTotal(unit * qty);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      unitCost: Number(formData.unitCost),
      quantity: Number(formData.quantity),
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      category: "",
      subcategory: "",
      description: "",
      unitCost: "",
      quantity: "",
      date: new Date().toISOString().split('T')[0],
    });
    setCalculatedTotal(0);
  };

  // Actualizar el total automáticamente cuando cambian los valores
  const handleUnitCostChange = (value: string) => {
    setFormData({ ...formData, unitCost: value });
    const unit = Number(value) || 0;
    const qty = Number(formData.quantity) || 0;
    setCalculatedTotal(unit * qty);
  };

  const handleQuantityChange = (value: string) => {
    setFormData({ ...formData, quantity: value });
    const unit = Number(formData.unitCost) || 0;
    const qty = Number(value) || 0;
    setCalculatedTotal(unit * qty);
  };

  const selectedCategoryData = formData.category ? costCategories[formData.category as keyof typeof costCategories] : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            💰 Registrar Gasto - {lotCode}
          </DialogTitle>
        </DialogHeader>

        {/* Alerta Visual */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-900">
            Este costo se sumará al <strong>{lotCode}</strong> y se reflejará en el cálculo del costo por hectárea.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selector de Categoría Jerárquico */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">1. Categoría Principal *</Label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(costCategories).map(([category, data]) => (
                    <SelectItem key={category} value={category}>
                      {data.icon} {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.category && selectedCategoryData && (
              <div className="pl-4 border-l-4 border-[#3BA935]">
                <Label htmlFor="subcategory">Subcategoría *</Label>
                <Select
                  value={formData.subcategory}
                  onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar subcategoría..." />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategoryData.subcategories.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Detalles del Costo */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium border-b pb-2">2. Detalles del Costo</h3>
            
            <div>
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ej: Pago de tractorista Sr. Juan, Compra de 10 sacos de fertilizante..."
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="unitCost">Costo Unitario (Bs) *</Label>
                <Input
                  id="unitCost"
                  type="number"
                  step="0.01"
                  value={formData.unitCost}
                  onChange={(e) => handleUnitCostChange(e.target.value)}
                  placeholder="100.00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="quantity">Cantidad *</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.01"
                  value={formData.quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  placeholder="Horas/Jornales/Sacos"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Horas, Jornales, Sacos, etc.
                </p>
              </div>

              <div>
                <Label htmlFor="date">Fecha del Gasto *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Resumen Automático */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-900 mb-2">3. Resumen Automático</h3>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total a Registrar:</span>
              <span className="text-2xl text-[#3BA935]">
                Bs {calculatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            {formData.unitCost && formData.quantity && (
              <p className="text-xs text-muted-foreground mt-2">
                {formData.quantity} × Bs {formData.unitCost} = Bs {calculatedTotal.toFixed(2)}
              </p>
            )}
          </div>

          {/* Evidencia */}
          <div>
            <Label>4. Evidencia (Opcional)</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#3BA935] transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Subir Foto de Recibo o Factura
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG hasta 5MB
              </p>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-[#3BA935] hover:bg-[#2E8B2A]"
              disabled={!formData.category || !formData.subcategory}
            >
              💾 Guardar Gasto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
