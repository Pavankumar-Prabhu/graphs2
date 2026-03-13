import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BarChartView } from "./bar-chart.js";

describe('BarChartView', () => {
    it('renders aria label', () => {
        render(<BarChartView data={[{ label: 'North', sales: 40 }]} series={[{ key: 'sales', label: 'Sales', colorVar: '--chart-series-1' }]}/>);

        expect(screen.getByLabelText('Bar chart')).toBeInTheDocument();
    });
});



