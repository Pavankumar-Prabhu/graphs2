import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChartInfo } from "./chart-info.js";

describe('ChartInfo', () => {
    it('renders the info trigger', () => {
        render(<ChartInfo description="Helpful text"/>);
        expect(screen.getByLabelText('Chart information')).toBeInTheDocument();
    });

    it('shows the tooltip on hover', () => {
        render(<ChartInfo title="Details" description="Helpful text"/>);
        const trigger = screen.getByLabelText('Chart information');
        fireEvent.mouseEnter(trigger.parentElement as HTMLElement);
        expect(screen.getByText('Helpful text')).toBeInTheDocument();
    });
});



