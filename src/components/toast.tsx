import { toast } from "react-toastify";

export function toastSuccess(title: string) {
	return toast(title, { type: "success", autoClose: 3000 });
}

export function toastError(title: string) {
	return toast(title, { type: "error", autoClose: 3000 });
}
