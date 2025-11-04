import {Metadata} from "next";
import {Settings} from "@theme/settings";

export const metadata: Metadata = {
    title: "Dashboard" + " | " + (Settings.cmsName??"Laureo CMS"),
};
export default function Home() {
  return (
    <h1 className="text-4xl font-bold">Dashboard</h1>
  );
}
