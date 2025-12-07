import app from "./app.ts";

const PORT = 3000;

app.listen(PORT, () => {
	// no-console no-undef
	console.log(`Server is running on http://localhost:${PORT}`);
});