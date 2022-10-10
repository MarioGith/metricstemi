import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Content } from "../../../components";
import { FirstMetric } from "../../../components/Kanban";

import Admin from "../../../layouts/Admin";

const FirstKanban = () => {
  return (
    <Admin>
      <Content>
        <FirstMetric />
      </Content>
    </Admin>
  );
};

export default FirstKanban;
