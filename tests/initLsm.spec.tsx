import initLsm from "../src/settings/initLsm";
import translations from "../examples/translations.json";

describe("initLsm", () => {
	it("should return the Provider Component's original name", async () => {
		const Provider = initLsm("en-US", translations);
		expect(Provider.name).toBe("ConfiguredLsmProvider");
	});
});
