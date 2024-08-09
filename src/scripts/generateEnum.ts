import { flattenObject, FlattenObjectKeyFormats } from "../utils/flattenObject";
import fs from "fs";
import path from "path";

export const generateEnum = (
	translationsPath: string,
	enumKeysFormat?: FlattenObjectKeyFormats,
	newOutputPath?: string
) => {
	if (!translationsPath) {
		console.error("Please provide the path to the translations file.");
		process.exit(1);
	}

	const resolvedTranslationsPath = path.resolve(
		process.cwd(),
		translationsPath
	);
	console.log(`Resolved Translations Path: ${resolvedTranslationsPath}`);

	const translations = require(resolvedTranslationsPath);

	const flattenedTranslations = flattenObject({
		obj: translations,
		format: enumKeysFormat,
	});

	const enumEntries = Object.entries(flattenedTranslations)
		.map(([key, value]) => `    ${key.replace(/-/g, "_")} = "${value}"`)
		.join(",\n");

	const enumContent = `export enum TranslationKeysEnum {\n${enumEntries}\n}\n`;

	const outputDir = path.resolve(
		process.cwd(),
		newOutputPath ?? "src/react-lsm"
	);
	console.log(`Output Directory: ${outputDir}`);
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	const outputPath = path.join(outputDir, `TranslationKeysEnum.ts`);
	fs.writeFileSync(outputPath, enumContent);

	console.log(`Enum TranslationKeysEnum generated successfully!`);
};
