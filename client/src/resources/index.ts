import enUS from "./en-US";
import ptBR from "./pt-BR";

type ResourceDict = { [language: string]: Object }

const resources: ResourceDict = {
    ["enUS"]: enUS,
    ["ptBR"]: ptBR,
};

export type { ResourceDict };

export default resources;