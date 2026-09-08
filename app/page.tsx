import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-center bg-base text-copy-primary",
      )}
    >
      arc dev
      <Button>Click me</Button>  
    </div>
  );
}
