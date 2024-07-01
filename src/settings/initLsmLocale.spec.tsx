import initLsmLocale from "./initLsmLocale";
import translations from "../example/translations.json";

describe("initLsmLocale", () => {
	it("should return the Provider Component's original name", async () => {
		const Provider = initLsmLocale("en-US", translations);
		expect(Provider.name).toBe("ConfiguredLsmLocaleProvider");
	});
});
