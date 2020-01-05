import React from "react";
import { useTranslation } from "react-i18next";

class Detail extends React.Component {
  render() {
    const { t } = useTranslation();    
    return <div>
        {t("Detail.SampleText")}
    </div>;
  }
}

export default Detail;
