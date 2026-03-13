import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChartToggle } from "./chart-toggle.js";

describe('ChartToggle', () => {
    it('renders label', () => {
        render(<ChartToggle checked label="On" onCheckedChange={() => undefined}/>);
        expect(screen.getByText('On')).toBeInTheDocument();
    });

    it('calls onCheckedChange on click', () => {
        const onCheckedChange = vi.fn();
        render(<ChartToggle checked={false} onCheckedChange={onCheckedChange}/>);
        fireEvent.click(screen.getByRole('switch'));
        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
});



