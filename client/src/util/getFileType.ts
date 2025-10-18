type FileType = "unknown" | "text" | "image" | "code";

const imageExtensions = new Set(["jpg", "jpeg", "png", "gif", "svg", "ico"]);

const codeExtensions = new Set([
	"js",
	"jsx",
	"ts",
	"tsx",
	"html",
	"css",
	"scss",
	"sass",
	"less",
	"json",
	"xml",
	"yml",
	"yaml",
	"py",
	"java",
	"cpp",
	"c",
	"cs",
	"h",
	"hpp",
	"php",
	"rb",
	"go",
	"rs",
	"swift",
	"kt",
	"kts",
	"sql",
	"sh",
	"bat",
	"ps1",
	"lua",
	"r",
	"pl",
	"asm",
	"vb",
]);

const textExtensions = new Set(["txt", "md", "rtf", "csv", "doc", "docx"]);

export default function getFileType(fileName: string): FileType {
	const extension = fileName.split(".")[1];

	if (imageExtensions.has(extension)) return "image";
	if (codeExtensions.has(extension)) return "code";
	if (textExtensions.has(extension)) return "text";

	return "unknown";
}
