#!/usr/bin/env ts-node

import { generateEnum } from "./scripts/generateEnum";

// Get the arguments from the command line arguments
/**
 * 1. @command ::fallback:: lsm-generate-enum
 * 2. @arg translationsPath
 * 3. @arg outputDir
 */

/**
 * @arg translationsPath
 * @required
 * @description The path to the translations file
 */
const translationsPath = process.argv[2];

/**
 * @arg outputDir
 * @optional
 * @description The path to the output directory
 * @default "src/react-lsm/enums"
 * @note If the directory does not exist, it will be created
 * @note It could be any of the translation objects you use, due to all the keys should be the same in all the translation objects
 */
const outputDir = process.argv[3];

console.log(`Translations Path: ${translationsPath}`);
console.log(`Enum Name: TranslationKeysEnum`);
console.log(`Output Dir: ${outputDir}`);
generateEnum(translationsPath, outputDir);
