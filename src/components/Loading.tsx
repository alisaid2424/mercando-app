import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80">
      <div className="w-full h-dvh grid place-content-center">
        <LoaderCircle className="h-20 w-20 animate-spin text-orange-300" />
      </div>
    </div>
  );
};

export default Loading;
