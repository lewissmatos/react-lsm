#!/usr/bin/env ts-node

import { generateEnum } from "./scripts/generateEnum";
import { FlattenObjectKeyFormats } from "./utils/flattenObject";

// Get the arguments from the command line arguments
/**
 * 1. @arg translationsPath
 * 2. @arg enumName
 * 3. @arg enumKeysFormat
 * 4. @arg outputDir
 */

/**
 * @arg translationsPath
 * @required
 * @description The path to the translations file
 */
const translationsPath = process.argv[2];

/**
 * @arg enumName
 * @required
 * @description The name of the enum
 * @note If the directory does not exist, it will be created
 */
const enumName = process.argv[3];

/**
 * @arg enumKeysFormat
 * @optional
 * @default "snake_case"
 * @description The format of the enum keys
 * @types "snake" | "camel" | "pascal" | "upper"
 */

let enumKeysFormat = process.argv[4] as FlattenObjectKeyFormats;
const allowedFormats: FlattenObjectKeyFormats[] = [
	"snake",
	"camel",
	"pascal",
	"upper",
];

if (!allowedFormats.includes(enumKeysFormat)) {
	enumKeysFormat = "snake";
}

/**
 * @arg outputDir
 * @optional
 * @description The path to the output directory
 * @default "src/react-lsm/enums"
 * @note If the directory does not exist, it will be created
 * @note If you want to use this argument but you don't want to change the default enum keys format, you must use '_' as third argument
 */
const outputDir = process.argv[5];

console.log(`Translations Path: ${translationsPath}`);
console.log(`Enum Name: ${enumName}`);
console.log(`Output Dir: ${outputDir}`);
generateEnum(translationsPath, enumName, enumKeysFormat, outputDir);
