import { registerHooks } from "node:module";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

// Match the application's extensionless TypeScript imports in Node's test runner.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) {
      const url = new URL(specifier, context.parentURL);
      if (
        !existsSync(fileURLToPath(url)) &&
        existsSync(fileURLToPath(url) + ".ts")
      ) {
        return nextResolve(
          pathToFileURL(fileURLToPath(url) + ".ts").href,
          context,
        );
      }
    }
    return nextResolve(specifier, context);
  },
});
