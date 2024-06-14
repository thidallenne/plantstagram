import { useState } from "react";
import useShowToast from "./useShowToast";

export default function usePreviewImg(){
	const showToast = useShowToast();
    const [selectedFile, setSelectedFile] = useState(null);
    const maxFileSizeInBytes = 2 * 1024 * 1024;

    const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			if (file.size > maxFileSizeInBytes) {
				showToast("Erreur", "La taille du fichier ne doit pas dépasser 2MB", "error");
				setSelectedFile(null);
				return;
			}
			const reader = new FileReader();

			reader.onloadend = () => {
				setSelectedFile(reader.result);
			};

			reader.readAsDataURL(file);
		} else {
			showToast("Erreur", "Merci de sélectionner une image", "error");
			setSelectedFile(null);
		}
	};

	return { selectedFile, handleImageChange, setSelectedFile };
}