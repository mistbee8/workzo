import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		// Check if we're in the browser
		if (typeof window !== "undefined") {
			const savedTheme = localStorage.getItem("theme") || "light";
			setTheme(savedTheme);
			document.documentElement.classList.toggle("dark", savedTheme === "dark");
		}
	}, []);

	const toggleTheme = () => {
		if (typeof window !== "undefined") {
			const newTheme = theme === "light" ? "dark" : "light";
			setTheme(newTheme);
			localStorage.setItem("theme", newTheme);
			document.documentElement.classList.toggle("dark", newTheme === "dark");
		}
	};

	// Prevent hydration mismatch by not rendering anything until mounted
	if (!mounted) {
		return <>{children}</>;
	}

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
