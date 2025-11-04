import {Metadata} from "next";
import {Settings} from "@theme/settings";

export const metadata: Metadata = {
    title: "Settings" + " | " + (Settings.cmsName??"Laureo CMS"),
};
export default function Home() {
  return (
    <h1 className="text-4xl font-bold">Settings</h1>
  );
}
