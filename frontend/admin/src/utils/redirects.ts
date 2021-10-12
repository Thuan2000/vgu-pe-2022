import { ROUTES } from "./routes";

export const loginRedirect = {
  redirect: {
    destination: ROUTES.LOGIN,
    permanent: false,
  },
};

export const companySlugRedirect = (companySlug: string) => {
  return {
    redirect: {
      destination: ROUTES.LOGIN,
      permanent: false,
    },
  };
};
