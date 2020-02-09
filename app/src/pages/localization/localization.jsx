import React from "react";
import ROUTES from "Constants/routes";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import "./localization.css";

class Localization extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div id="localization">
          <Link to={ROUTES.WELCOME} className="left">Go back</Link>
        <div className="localization">{t("Hello")}</div>
        <div className="italics">
            Try changing the language in the menu bar!
          </div>
      </div>
    );
  }
}

export default withTranslation()(Localization);
