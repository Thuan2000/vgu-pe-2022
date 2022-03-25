import LanguageSelector from "@components/language-selector";
import React from "react";
import Logo from "../logo";
import { SubscriptionInfoText } from "../subscription-info-text";

export function Header({}) {
  return (
    <>
      <div className="fic justify-between pr-3">
        <Logo size="big" />
        <LanguageSelector showText={false} />
      </div>

      <div className={`mr-10`}>
        <SubscriptionInfoText stack="column" />
      </div>
    </>
  );
}
