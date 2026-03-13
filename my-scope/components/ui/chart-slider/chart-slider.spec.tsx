import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChartSlider } from "./chart-slider.js";

describe('ChartSlider', () => {
    it('renders slider items', () => {
        render(<ChartSlider items={[
                { key: 'jan', label: 'Jan' },
                { key: 'feb', label: 'Feb' },
            ]} activeKey="jan" onChange={() => undefined}/>);
        expect(screen.getByText('Jan')).toBeInTheDocument();
        expect(screen.getByText('Feb')).toBeInTheDocument();
    });

    it('calls onChange when item is clicked', () => {
        const onChange = vi.fn();
        render(<ChartSlider items={[{ key: 'jan', label: 'Jan' }]} activeKey="jan" onChange={onChange}/>);
        fireEvent.click(screen.getByRole('button', { name: 'Jan' }));
        expect(onChange).toHaveBeenCalledWith('jan');
    });

    it('disables buttons when disabled', () => {
        render(<ChartSlider items={[{ key: 'jan', label: 'Jan' }]} activeKey="jan" disabled onChange={() => undefined}/>);
        expect(screen.getByRole('button', { name: 'Jan' })).toBeDisabled();
    });
});



