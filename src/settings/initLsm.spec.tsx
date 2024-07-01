import translations from "../example/translations.json";
import initLsm from "./initLsm";

describe("initLsm", () => {
	it("should return the Provider Component's original name", async () => {
		const Provider = initLsm("en-US", translations);
		expect(Provider.name).toBe("ConfiguredLsmProvider");
	});
});
