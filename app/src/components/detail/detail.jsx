import React from "react";
import { withTranslation } from "react-i18next";

class Detail extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <p>In this component, we render a simple translation: {t("sampleTranslation")}</p>        
      </div>
    );
  }
}

export default withTranslation()(Detail);
