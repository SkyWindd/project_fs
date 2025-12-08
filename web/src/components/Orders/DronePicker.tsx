import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

export default function DronePicker({ open, onClose, onSelect }: any) {
  const [drones, setDrones] = useState<any[]>([]);

  useEffect(() => {
    if (open) loadDrones();
  }, [open]);

  const loadDrones = async () => {
    const res = await fetch("/api/admin/drones"); // backend cần route này
    const data = await res.json();
    setDrones(data.drones || []);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogTitle>Chọn drone để giao hàng</DialogTitle>

        <div className="space-y-3 mt-4">
          {drones.map((drone) => (
            <Button
              key={drone.drone_id}
              variant="outline"
              className="w-full justify-between"
              onClick={() => {
                onSelect(drone.drone_id);
                onClose();
              }}
            >
              🚁 Drone #{drone.drone_id}
              <span className="text-xs text-gray-500">
                {drone.status}
              </span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
