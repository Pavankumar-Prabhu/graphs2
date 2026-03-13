import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PieChartView } from "./pie-chart.js";

describe('PieChartView', () => {
    it('renders aria label', () => {
        render(<PieChartView data={[{ label: 'North', value: 40 }]} series={[{ key: 'value', label: 'Value', colorVar: '--chart-series-1' }]}/>);

        expect(screen.getByLabelText('Pie chart')).toBeInTheDocument();
    });
});



