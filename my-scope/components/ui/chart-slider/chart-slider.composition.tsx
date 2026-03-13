import React, { useState } from "react";
import { ChartSlider } from "./chart-slider.js";

export const BasicChartSlider = () => {
    const [activeKey, setActiveKey] = useState('jan');

    return (<ChartSlider items={[
            { key: 'jan', label: 'Jan' },
            { key: 'feb', label: 'Feb' },
            { key: 'mar', label: 'Mar' },
        ]} activeKey={activeKey} onChange={setActiveKey}/>);
};



