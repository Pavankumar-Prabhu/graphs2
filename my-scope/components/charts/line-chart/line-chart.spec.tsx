import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LineChartView } from "./line-chart.js";

describe('LineChartView', () => {
    it('renders aria label', () => {
        render(<LineChartView data={[{ label: 'North', sales: 40 }]} series={[{ key: 'sales', label: 'Sales', colorVar: '--chart-series-1' }]}/>);

        expect(screen.getByLabelText('Line chart')).toBeInTheDocument();
    });
});



