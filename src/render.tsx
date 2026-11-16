import { mkdir, writeFile } from "node:fs/promises";
import { ElementsError, formatDiagnostics, outline, render, validate } from "@hyper-elements/react";
import HalyardLanding from "./halyard";

const template = <HalyardLanding />;

try {
  const report = validate(template);
  console.log("— validate() —");
  console.log(formatDiagnostics(report.diagnostics) || "(no diagnostics)");
  if (!report.valid) {
    process.exitCode = 1;
    throw new Error("Template failed validation");
  }
  console.log("— outline() —");
  console.log(outline(template));

  const { html, text, diagnostics } = await render(template);
  console.log("— render() —");
  console.log(formatDiagnostics(diagnostics) || "(no diagnostics)");
  await mkdir("out", { recursive: true });
  await writeFile("out/index.html", html);
  await writeFile("out/index.txt", text);
  console.log(`wrote out/index.html (${html.length} bytes) and out/index.txt`);
} catch (e) {
  if (e instanceof ElementsError) {
    console.error(formatDiagnostics(e.diagnostics));
    process.exitCode = 1;
  } else {
    throw e;
  }
}
