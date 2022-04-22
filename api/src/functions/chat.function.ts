import { ICompany } from "@graphql/types";

export function getChatCreationParam(comp: ICompany | any) {
	return {
		compId: comp.id,
		compName: comp.name,
		compShortName: comp.shortName
	};
}
