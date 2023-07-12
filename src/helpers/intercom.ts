import Window from "../utils/window";

const intercomKey = import.meta.env.VITE_INTERCOM_KEY || "";

const IntercomHelper = new (class {
	private Intercom = (...args: unknown[]): void => {
		const intercomApi = Window.get("Intercom") as (args: unknown[]) => void;
		if (intercomApi) {
			intercomApi(args);
		}
	};

	private settings = {
		app_id: intercomKey,
		hide_default_launcher: true,
	};

	private loadScript = () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.intercomSettings = this.settings;
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.async = true;
		script.src = `https://widget.intercom.io/widget/${intercomKey}`;
		const firstScript = document.getElementsByTagName("script")[0];
		(firstScript.parentNode || document.body).insertBefore(script, firstScript);
	};

	private attachToWindow = () => {
		const queue = [];
		const intercomApi = (...args: unknown[]): void => {
			queue.push(args);
		};
		Window.set("Intercom", intercomApi);
	};

	initialize() {
		const intercomApi = Window.get("Intercom");
		if (typeof intercomApi === "function") {
			intercomApi("reattach_activator");
			intercomApi("update", this.settings);
			return;
		}

		this.attachToWindow();

		if (document.readyState === "complete") {
			this.loadScript();
		} else if ("attachEvent" in window) {
			// eslint-disable-next-line
			// @ts-ignore
			(window["attachEvent"] as unknown)("onload", () => {
				this.loadScript();
			});
		} else {
			window.addEventListener(
				"load",
				() => {
					this.loadScript();
				},
				false
			);
		}
	}

	update<T>(data: T) {
		this.Intercom("update", data);
	}

	show() {
		this.Intercom("show");
	}

	hide() {
		this.Intercom("hide");
	}

	shutdown() {
		this.Intercom("shutdown");
	}
})();

export default IntercomHelper;
