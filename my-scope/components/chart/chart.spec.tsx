import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Chart } from "./chart.js";

const baseProps = {
    title: 'Sales Performance overview',
    subtitle: 'Sales trend across regions',
    frames: {
        jan: [
            { label: 'North', sales: 21, href: '/north' },
            { label: 'South', sales: 30, href: '/south' },
        ],
        feb: [
            { label: 'North', sales: 25, href: '/north' },
            { label: 'South', sales: 29, href: '/south' },
        ],
    },
    sliderItems: [
        { key: 'jan', label: 'Jan' },
        { key: 'feb', label: 'Feb' },
    ],
    series: [{ key: 'sales', label: 'Sales', colorVar: '--chart-series-1' }],
};

describe('Chart', () => {
    it('renders title', () => {
        render(<Chart {...baseProps}/>);
        expect(screen.getByText('Sales Performance overview')).toBeInTheDocument();
    });

    it('renders subtitle', () => {
        render(<Chart {...baseProps}/>);
        expect(screen.getByText('Sales trend across regions')).toBeInTheDocument();
    });

    it('renders all default chart tabs', () => {
        render(<Chart {...baseProps}/>);
        expect(screen.getByText('Pie')).toBeInTheDocument();
        expect(screen.getByText('Bar')).toBeInTheDocument();
        expect(screen.getByText('Line')).toBeInTheDocument();
        expect(screen.getByText('Stacked Bar')).toBeInTheDocument();
    });

    it('renders info button when info is passed', () => {
        render(<Chart {...baseProps} info={{ description: 'helpful text' }}/>);
        expect(screen.getByLabelText('Chart information')).toBeInTheDocument();
    });

    it('renders legend item from series', () => {
        render(<Chart {...baseProps}/>);
        expect(screen.getByText('Sales')).toBeInTheDocument();
    });

    it('renders slider items', () => {
        render(<Chart {...baseProps}/>);
        expect(screen.getByText('Jan')).toBeInTheDocument();
        expect(screen.getByText('Feb')).toBeInTheDocument();
    });

    it('switches chart type to bar', () => {
        const onChartTypeChange = vi.fn();
        render(<Chart {...baseProps} onChartTypeChange={onChartTypeChange}/>);
        fireEvent.click(screen.getByText('Bar'));
        expect(onChartTypeChange).toHaveBeenCalledWith('bar');
    });

    it('switches chart type to pie', () => {
        const onChartTypeChange = vi.fn();
        render(<Chart {...baseProps} onChartTypeChange={onChartTypeChange}/>);
        fireEvent.click(screen.getByText('Pie'));
        expect(onChartTypeChange).toHaveBeenCalledWith('pie');
    });

    it('switches chart type to stacked bar', () => {
        const onChartTypeChange = vi.fn();
        render(<Chart {...baseProps} onChartTypeChange={onChartTypeChange}/>);
        fireEvent.click(screen.getByText('Stacked Bar'));
        expect(onChartTypeChange).toHaveBeenCalledWith('stacked-bar');
    });

    it('changes frame to feb', () => {
        const onFrameChange = vi.fn();
        render(<Chart {...baseProps} onFrameChange={onFrameChange}/>);
        fireEvent.click(screen.getByRole('button', { name: 'Feb' }));
        expect(onFrameChange).toHaveBeenCalledWith('feb');
    });

    it('disables slider after toggle click', () => {
        render(<Chart {...baseProps}/>);
        fireEvent.click(screen.getByRole('switch'));
        expect(screen.getByRole('button', { name: 'Jan' })).toBeDisabled();
    });

    it('enables slider by default', () => {
        render(<Chart {...baseProps}/>);
        expect(screen.getByRole('button', { name: 'Jan' })).not.toBeDisabled();
    });

    it('calls navigation when plotted point is clicked', () => {
        const onNavigate = vi.fn();
        render(<Chart {...baseProps} onNavigate={onNavigate}/>);
        fireEvent.click(screen.getByText(/North/));
        expect(onNavigate).toHaveBeenCalled();
    });

    it('renders with default chart type line when not provided', () => {
        render(<Chart {...baseProps}/>);
        expect(screen.getByLabelText('Line chart')).toBeInTheDocument();
    });

    it('renders bar chart when defaultChartType is bar', () => {
        render(<Chart {...baseProps} defaultChartType="bar"/>);
        expect(screen.getByLabelText('Bar chart')).toBeInTheDocument();
    });
});



