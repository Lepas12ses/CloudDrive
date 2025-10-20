import { twMerge, type ClassNameValue } from "tailwind-merge";

export default function cn(...classes: ClassNameValue[]) {
	return twMerge(...classes);
}
