import type { WorldCloudChartOptions } from "@carbon/charts";
import { WordCloudChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";

export type WordCloudProps = {
  title: string;
  data: {
    group: string;
    word: string;
    value: number;
  }[];
};

export default function WordCloud({ title, data }: WordCloudProps) {
  const options: WorldCloudChartOptions = {
    title,
    height: "800px",
    legend: {
      enabled: false,
    },
    toolbar: {
      enabled: false,
    },
    color: {
      scale: {
        [title]: "var(--color-text)",
      },
    },
  };

  return <WordCloudChart data={data} options={options}></WordCloudChart>;
}
