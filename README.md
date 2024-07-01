# react-lsm

### React Localization Storage Manager

A simple library to manage localization storage in React applications.
This does not require any additional dependencies.
Simpler, smaller, and easier to use than other libraries.

### Prerequisites

- React 18.3.1 or later
- React-DOM 18.3.1 or later

### License

**MIT**

### Author

**Lewis S. Matos**

```markdown
For more information, see the [Author Page](https://lewissmatos.dev)
```

## Getting Started

### Installation

To install the package, run the following command:

```sh
npm install react-lsm
```

### Usage

```jsx
import React from "react";
import { initLsm, useLsm } from "react-lsm";

/**
 * This is the LSM Provider component
 * It should be placed at the root of your application
 * first argument is the default language / fallback language
 * second argument is the translations object
 * @comment We recommend to have a separated file for the translations object
 */
const LsmProvider = initLsm("en-US", {
	"en-US": {
		greeting: "Hello",
		farewell: "Goodbye",
		navbar: {
			home: "Home",
			about: "About",
			contact: "Contact",
		},
		activeNotifications: "You have {value} notifications",
		info: "information",
		submit: "Submit",
		loading: "Loading",
		orderStatus: "Your order is {status}",
		orderStatuses: {
			pending: "pending",
			processing: "processing",
			shipped: "shipped",
			delivered: "delivered",
		},
	},
	"es-MX": {
		greeting: "Hola",
		farewell: "Adiós",
		navbar: {
			home: "Inicio",
			about: "Acerca",
			contact: "Contacto",
		},
		activeNotifications: "Tienes {value} notificaciones",
		info: "información",
		submit: "Enviar",
		loading: "Cargando",
		orderStatus: "Su orden está {status}",
		orderStatuses: {
			pending: "pendiente",
			processing: "procesando",
			shipped: "enviada",
			delivered: "entregada",
		},
	},
});

const App = () => {
	const { translate, setLanguage, language } = useLsm();
	return (
		<LsmProvider>
			<div>
				<h1>{translate("greeting")}</h1>
				<button onClick={() => setLanguage("es-MX")}>Español</button>
				<button onClick={() => setLanguage("en-US")}>English</button>
				<p>{language}</p> {/* This will show the current language */}
				<h1>{translate("farewell")}</h1>
			</div>
		</LsmProvider>
	);
};
```

## Examples

For convenience, the following examples are provided. We are going to use English and Spanish as the languages for the examples.

### Basic Usage

```jsx
import React from "react";
import { useLsm } from "react-lsm";

const Example = () => {
	const { translate } = useLsm();
	return <h1>{translate("greeting")}</h1>;
	// Output: Hello
	// Output: Hola
};
```

### Options Usage

```ts
/**
 * The following options are available:
 * - capitalize: Capitalize the first letter of the value
 * - uppercase: Convert the value to uppercase
 * - lowercase: Convert the value to lowercase
 * - replace: Replace the value with the specified values
 * - mutate: Mutate the value based on the specified options
 */
type TranslationOptions = {
	capitalize?: boolean;
	uppercase?: boolean;
	lowercase?: boolean;
	replace?: {
		values: { [key: string]: string | number };
		withTranslation?: boolean;
	};
	mutate?: {
		when: boolean;
		value: string;
		withTranslation?: boolean;
	};
	startAdornment?: string;
	endAdornment?: string;
};
```

#### Capitalize

```jsx
import React from "react";
import { useLsm } from "react-lsm";

const Example = () => {
	const { translate } = useLsm();
	return <h1>{translate("info", { capitalize: true })}</h1>;
	// Output: Information
	// Output: Información
};
```

#### Uppercase

```jsx
import React from "react";
import { useLsm } from "react-lsm";

const Example = () => {
	const { translate } = useLsm();
	return <h1>{(translate("greeting"), { uppercase: true })}</h1>;
	// Output: HELLO
	// Output: HOLA
};
```

#### Lowercase

```jsx
import React from "react";
import { useLsm } from "react-lsm";

const Example = () => {
	const { translate } = useLsm();
	return <h1>{translate("greeting", { lowercase: true })}</h1>;
	// Output: hello
	// Output: hola
};
```

#### Replace 🤔

```jsx
import React from "react";
import { useLsm } from "react-lsm";

const Example = () => {
	const { translate } = useLsm();
	/*
	 * The key is the value to be replaced
	 * The value is the new value
	 */
	return (
		<h1>
			{translate("activeNotifications", {
				replace: { values: { value: 5 } },
			})}
		</h1>
	);
	// Output: You have 5 notifications
	// Output: Tienes 5 notificaciones
};
```

#### Replace, Without Translation ❌

```jsx
import React from "react";
import { useLsm } from "react-lsm";

const Example = () => {
    const { translate } = useLsm();
    return (
        <h1>
            {
                translate("orderStatus", {
                    replace: {
                        values: {
                            status: "pending",
                        },
                    },
                }),
            }
        </h1>
    );
    // Output: Your order is pending
    // Output: Su orden está pending ❌ (This is undesirable)
};
```

#### Replace, With Translation (Recommended) ✅

```jsx
import React from "react";
import { useLsm } from "react-lsm";

const Example = () => {
	const { translate } = useLsm();
	return (
		<h1>
			{translate("orderStatus", {
				replace: {
					values: { status: "orderStatuses.shipped" },
					withTranslation: true,
				},
			})}
		</h1>
	);
	// Output: Your order is shipped
	// Output: Su orden está enviada
};
```

#### Replace, Explicit translation (Manual translation)

```jsx
import React from "react";
import { useLsm } from "react-lsm";

const Example = () => {
	const { translate } = useLsm();
	return (
		<h1>
			{translate("orderStatus", {
				replace: { values: { status: translate("shipped") } },
			})}
		</h1>
	);
	// Output: Your order is shipped
	// Output: Su orden está enviada
};
```

#### Mutate: Basic 🤔

```jsx
import React from "react";
import { useLsm } from "react-lsm";

const Example = () => {
	const { translate } = useLsm();

	const isLoading = true || false;
	return (
		<h1>
			{translate("submit", {
				mutate: { when: isLoading, value: "loading" },
			})}
		</h1>
	);
	/**
	 * @condition isLoading = false
	 * Output: Submit
	 * Output: Enviar
	 * @condition isLoading = true
	 * Output: loading
	 * Output: loading ❌ (This is undesirable)
	 */
};
```

#### Mutate, With Translation (Recommended) ✅

```jsx
import React from "react";
import { useLsm } from "react-lsm";

const Example = () => {
	const { translate } = useLsm();

	const isLoading = true || false;
	return (
		<h1>
			{translate("submit", {
				mutate: { when: isLoading, value: "loading", withTranslation: true },
			})}
		</h1>
	);
	/**
	 * @condition isLoading = false
	 * Output: Submit
	 * Output: Enviar
	 * @condition isLoading = true
	 * Output: Loading
	 * Output: Cargando
	 */
};
```

#### Mutate, Explicit translation (Manual translation) 🤔

```jsx
import React from "react";
import { useLsm } from "react-lsm";

const Example = () => {
	const { translate } = useLsm();

	const isLoading = true || false;
	return (
		<h1>
			{translate("submit", {
				mutate: {
					when: isLoading,
					value: translate("loading"),
				},
			})}
		</h1>
	);
	/**
	 * @condition isLoading = false
	 * Output: Submit
	 * Output: Enviar
	 * @condition isLoading = true
	 * Output: Loading
	 * Output: Cargando
	 */
};
```

#### Start Adornment

```jsx
import React from "react";
import { useLsm } from "react-lsm";

const Example = () => {
const { translate } = useLsm();

const isLoading = true || false;
return (
    <h1>
        {translate("submit", {startAdornment: "🚀 "})})
    </h1>
    // Output: 🚀 Submit
    // Output: 🚀 Enviar
}
```

#### End Adornment

```jsx
import React from "react";
import { useLsm } from "react-lsm";

const Example = () => {
const { translate } = useLsm();

const isLoading = true || false;
return (
    <h1>
        {translate("greeting", {endAdornment: " 🇩🇴"})})
    </h1>
    // Output: Hello 🇩🇴
    // Output: Hola 🇩🇴
}
```

#### Mutate, With Translation + End Adornment ✅

```jsx
import React from "react";
import { useLsm } from "react-lsm";

const Example = () => {
	const { translate } = useLsm();

	const isLoading = true || false;
	return (
		<h1>
			{translate("submit", {
				mutate: {
					when: isLoading,
					value: "loading",
					withTranslation: true,
				},
				endAdornment: "...",
			})}
		</h1>
	);
	/**
	 * @condition isLoading = false
	 * Output: Submit
	 * Output: Enviar
	 * @condition isLoading = true
	 * Output: Loading...
	 * Output: Cargando...
	 */
};
```
