import React, { useState } from "react";
import { ChartToggle } from "./chart-toggle.js";

export const BasicChartToggle = () => {
    const [checked, setChecked] = useState(true);

    return (<ChartToggle checked={checked} onCheckedChange={setChecked} label="On"/>);
};



