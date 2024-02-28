import { promises as fs } from "fs";

export default async function Home() {
  console.log("Hello");
  const file = await fs.readFile(process.cwd() + "/app/courses.json", "utf8");
  const data = JSON.parse(file);
  console.log(data);
  Object;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello
    </main>
  );
}
