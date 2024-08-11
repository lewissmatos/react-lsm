#!/usr/bin/env ts-node
import { generateEnum } from "./scripts/generateEnum";

// Get the arguments from the command line arguments
/**
 * 1. @command ::fallback:: lsm-generate-enum
 * 2. @arg translationsPath
 * 3. @arg enumName
 */

/**
 * @arg translationsPath
 * @required
 * @description The path to the translations file
 */
const translationsPath = process.argv[2];

/**
 * @arg enumName
 * @optional
 * @description The name of the enum to be generated
 * @default "LsmTranslationKeys"
 */
const enumName = process.argv[3] ?? "LsmTranslationKeys";

console.log(`Translations Path: ${translationsPath}`);
console.log(`Enum Name: ${enumName}`);

generateEnum(translationsPath, enumName);
