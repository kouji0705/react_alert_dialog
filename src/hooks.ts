import { useEffect } from "react";

export const useBlocker = (blocker: () => void, when = true) => {
	useEffect(() => {
		if (!when) return;

		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();
			blocker();
		};

		const handleBeforeRoute = (e: Event) => {
			if (
				!window.confirm(
					"変更が保存されていません。ページを離れてもよろしいですか？",
				)
			) {
				e.preventDefault();
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		window.addEventListener("popstate", handleBeforeRoute);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
			window.removeEventListener("popstate", handleBeforeRoute);
		};
	}, [blocker, when]);
};
