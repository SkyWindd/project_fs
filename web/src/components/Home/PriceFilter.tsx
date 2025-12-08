import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../components/ui/select";

interface PriceFilterProps {
  value: string;
  onChange: (value: string) => void;
}
export function PriceFilter({ value, onChange }: PriceFilterProps) {
    return( 
        <div className="">
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lọc theo giá" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="0-100">Giá: 0-100</SelectItem>
            <SelectItem value="100-200">Giá: 100-200</SelectItem>
            <SelectItem value="200-500">Giá: 200-500</SelectItem>
            <SelectItem value="500+">Giá: 500+</SelectItem>
            </SelectContent>
        </Select>
        </div>
    )
}