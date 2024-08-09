# React Localization Storage Manager / react-lsm

![react-jumbo](https://github.com/lewissmatos/react-lsm/assets/112432349/7cca6238-f412-4f98-86ad-f7d25ba6b6d8)

## Package

```js
react - lsm;
```

A simple library to manage localization storage in React applications.
This does not require any additional dependencies.
Simpler, smaller, and easier to use than other libraries.

## Prerequisites

- React 18.3.1 or later
- React-DOM 18.3.1 or later

## License

#### **MIT** :copyright:

## Author

### **Lewis S. Matos**

<!-- ```markdown
For more information, see the [Author Page](https://lewissmatos.dev)
``` -->

## Getting Started

### Installation

To install the package, run the following command:

```sh
$ npm install react-lsm
```

### Usage

```jsx
import React from "react";
import { initLsm, useLsmTranslation } from "react-lsm";

/**
 * This is the LSM Provider component
 * It should be placed at the root of your application
 * first argument is the default language / fallback language
 * second argument is the translations object
 * @comment We recommend to have a separated file for the translations object
 */

const LsmConfiguredProvider = initLsm("en-US", {
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
		userProfile: "User Profile",
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
		userProfile: "Perfil de Usuario",
	},
});

// App.jsx

const App = () => {
	return (
		<LsmConfiguredProvider>
			<Example />
		</LsmConfiguredProvider>;
	);
};
```

#### Example.jsx

```jsx
import { useLsmTranslation } from "react-lsm";
const Example = () => {
	const { translate, language, setLanguage } = useLsmTranslation();
	return (
		<div>
			<h1>{translate("greeting")}</h1>
			<button onClick={() => setLanguage("es-MX")}>Español</button> {/* This will change the language */}
			<button onClick={() => setLanguage("en-US")}>English</button>{" "}
			{/* This will change the language */}
			<p>{language}</p> {/* This will show the current language */}
			<h1>{translate("farewell")}</h1>
		</div>
	);
	// Output: Hello
	// Output: Hola
};
```

## Examples

For convenience, the following examples are provided. We are going to use English and Spanish as the languages for the examples.

### Important! :warning:

If you are using the **useLsmTranslation** hook in a component that implements **React.useEffect()** or **React.useLayoutEffect()**,
that mutates a **React.useState** o **React.useRef** in the component,
you will need to wrap the component that uses the **state** in a **React.memo()** hook.
This is to prevent the component from re-rendering or having layout issues.

#### Example (Wrong Approach) :warning:

```jsx
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
	const { translate } = useLsmTranslation();
	const fetchUserData = async () => {
		const response = await fetch("https://api.example.com/user");
		const data = await response.json();
		return data;
	};

	const [userData, setUserData] = useState(null);

	useEffect(() => {
		fetchUserData().then((data) => setUserData(data)); 	<- This is the important part
	}, []);

	return (
		<div>
			<h1>{translate("userProfile")}</h1>
			{/* Wrong Approach - Output: User Profile */ }
			<p>{userData.name}</p>
			<p>{userData.email}</p>
		</div>
	);
};
```

#### Example (Correct Approach) :white_check_mark:

```jsx
import React from "react";
import { useLsmTranslation } from "react-lsm";

// This is the correct approach
const UserProfileData = React.memo(({userData}: {userData: any}) => {
	return (
		<div>
			<p>{userData.name}</p>
			<p>{userData.email}</p>
		</div>
	);
});

const Example = () => {
	const { translate } = useLsmTranslation();

	const fetchUserData = async () => {
		const response = await fetch("https://api.example.com/user");
		const data = await response.json();
		return data;
	};

	const [userData, setUserData] = useState(null);

	useEffect(() => {
		fetchUserData().then((data) => setUserData(data)); 	<- This is the important part
	}, []);

	return (
		<div>
			<h1>{translate("userProfile")}</h1>
			{/* Correct Approach - Output: User Profile */ }
			<UserProfileData userData={userData} />
		</div>
	);
};
```

You should use **React.memo** to wrap the component that uses the **state** because that request does not depend on the language change.

### Basic Usage

```jsx
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
	const { translate } = useLsmTranslation();
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
	prefixContent?: string;
	suffixContent?: string;
};
```

#### Capitalize :a:

```jsx
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
	const { translate } = useLsmTranslation();
	return <h1>{translate("info", { capitalize: true })}</h1>;
	// Output: Information
	// Output: Información
};
```

#### Uppercase :capital_abcd:

```jsx
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
	const { translate } = useLsmTranslation();
	return <h1>{(translate("greeting"), { uppercase: true })}</h1>;
	// Output: HELLO
	// Output: HOLA
};
```

#### Lowercase :abcd:

```jsx
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
	const { translate } = useLsmTranslation();
	return <h1>{translate("greeting", { lowercase: true })}</h1>;
	// Output: hello
	// Output: hola
};
```

#### Replace :repeat:

```jsx
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
	const { translate } = useLsmTranslation();
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

#### Replace, Without Translation

```jsx
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
    const { translate } = useLsmTranslation();
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
    // Output: Su orden está pending  (This is undesirable)
};
```

#### Replace, With Translation (Recommended) :white_check_mark:

```jsx
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
	const { translate } = useLsmTranslation();
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

#### Replace, Explicit translation (Manual translation) :arrows_clockwise:

```jsx
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
	const { translate } = useLsmTranslation();
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
import { useLsmTranslation } from "react-lsm";

const Example = () => {
	const { translate } = useLsmTranslation();

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
	 * Output: loading  (This is undesirable)
	 */
};
```

#### Mutate, With Translation (Recommended) :white_check_mark:

```jsx
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
	const { translate } = useLsmTranslation();

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
import { useLsmTranslation } from "react-lsm";

const Example = () => {
	const { translate } = useLsmTranslation();

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
import { useLsmTranslation } from "react-lsm";

const Example = () => {
const { translate } = useLsmTranslation();

const isLoading = true || false;
return (
    <h1>
        {translate("submit", {prefixContent: "🚀 "})})
    </h1>
    // Output: 🚀 Submit
    // Output: 🚀 Enviar
}
```

#### End Adornment

```jsx
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
const { translate } = useLsmTranslation();

const isLoading = true || false;
return (
    <h1>
        {translate("greeting", {suffixContent: " 🇩🇴"})})
    </h1>
    // Output: Hello 🇩🇴
    // Output: Hola 🇩🇴
}
```

#### Mutate, With Translation + End Adornment :white_check_mark:

```jsx
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
	const { translate } = useLsmTranslation();

	const isLoading = true || false;
	return (
		<h1>
			{translate("submit", {
				mutate: {
					when: isLoading,
					value: "loading",
					withTranslation: true,
				},
				suffixContent: "...",
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

#### Override Language :arrows_counterclockwise:

It does not change the language of the application, it only changes the language of the translation.

```jsx
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
	const { translate } = useLsmTranslation();

	const isLoading = true || false;
	return (
		<h1>
				{translate("greeting", {overrideLanguage: "es-MX"})})
		</h1>
    // Output: Hola
}
```

## CLI Commands

### Generate Enum

```sh
$ npm install -g react-lsm
```

```sh
$ lsm-generate-enum <translationsPath> [enumKeysFormat] [outputDir]
```

- `<translationsPath>`: The path to the translations file (required).

- `[enumKeysFormat]`: The format of the enum keys (optional, default: "snake"). Allowed values are "snake", "camel", "pascal", "upper".

- `[outputDir]`: The path to the output directory (optional, default: "src/react-lsm").

#### Example

```json
{
	"greeting": "Hello",
	"farewell": "Goodbye",
	"navbar": {
		"home": "Home",
		"about": "About",
		"contact": "Contact"
	}
}
```

#### Enum variants

```typescript

- **snake**:

  export enum EnUs {
    greeting = "greeting",
    farewell = "farewell",
    navbar_home = "navbar.home",
    navbar_about = "navbar.about",
    navbar_contact = "navbar.contact"
  }

- **camel**:

  export enum EnUs {
    greeting = "greeting",
    farewell = "farewell",
    navbarHome = "navbar.home",
    navbarAbout = "navbar.about",
    navbarContact = "navbar.contact"
  }

- **pascal**:

  export enum EnUs {
    Greeting = "greeting",
    Farewell = "farewell",
    NavbarHome = "navbar.home",
    NavbarAbout = "navbar.about",
    NavbarContact = "navbar.contact"
  }

- **upper**:

  export enum EnUs {
    GREETING = "greeting",
    FAREWELL = "farewell",
    NAVBAR_HOME = "navbar.home",
    NAVBAR_ABOUT = "navbar.about",
    NAVBAR_CONTACT = "navbar.contact"
  }
```
