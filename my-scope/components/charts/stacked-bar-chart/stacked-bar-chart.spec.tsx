import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StackedBarChartView } from "./stacked-bar-chart.js";

describe('StackedBarChartView', () => {
    it('renders aria label', () => {
        render(<StackedBarChartView data={[{ label: 'North', a: 10, b: 15 }]} series={[
                { key: 'a', label: 'A', colorVar: '--chart-series-1' },
                { key: 'b', label: 'B', colorVar: '--chart-series-2' },
            ]}/>);

        expect(screen.getByLabelText('Stacked bar chart')).toBeInTheDocument();
    });
});



