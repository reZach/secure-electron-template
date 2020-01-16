import React from "react";
import { withTranslation } from "react-i18next";

class Detail extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        {t("found")}
        {t("pickle")}
      </div>
    );
  }
}

export default withTranslation()(Detail);
