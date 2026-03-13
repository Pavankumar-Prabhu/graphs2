import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChartContainer } from "./chart-container.js";

describe('ChartContainer', () => {
    it('renders children', () => {
        render(<ChartContainer>Chart body</ChartContainer>);
        expect(screen.getByText('Chart body')).toBeInTheDocument();
    });

    it('applies the provided className', () => {
        const { container } = render(<ChartContainer className="custom">Chart body</ChartContainer>);
        expect(container.firstChild).toHaveClass('chart-container-root');
        expect(container.firstChild).toHaveClass('custom');
    });
});



