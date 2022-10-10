import React from "react";
import { Content } from "../../../components";
import { SecondMetric } from "../../../components/Kanban";

import Admin from "../../../layouts/Admin";

const SecondKanban = () => {
  return (
    <Admin>
      <Content>
        <SecondMetric />
      </Content>
    </Admin>
  );
};

export default SecondKanban;
