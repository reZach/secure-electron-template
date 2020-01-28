import React from "react";
import { withTranslation } from "react-i18next";
import "./detail.css";

class Detail extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="center">
        <div className="translation">{t("Hello")}</div>
        <div className="italics">Try changing the language in the menu bar!</div>
      </div>      
    );
  }
}

export default withTranslation()(Detail);
