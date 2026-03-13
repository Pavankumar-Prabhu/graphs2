import type { SliderItem } from "@my-scope/components.lib";

export type ChartSliderProps = {
    items: SliderItem[];
    activeKey: string;
    disabled?: boolean;
    onChange: (key: string) => void;
};



