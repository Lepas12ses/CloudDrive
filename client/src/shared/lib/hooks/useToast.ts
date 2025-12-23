import { ToastContext } from "@/shared/ui/components/Toast/ToastContext";
import { useContext } from "react";

export default function useToast() {
	return useContext(ToastContext);
}
