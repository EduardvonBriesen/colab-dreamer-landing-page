import { WordCloudChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";

import excludeWords from "./data/exclude-words.json";

function reduceWords(
  input: { dream: number; wordgroups: string[] }[],
  excludeWords: string[]
) {
  const wordCounts: { [word: string]: number } = {};

  // Iterate through the input array and count words
  input.forEach(({ wordgroups }) => {
    wordgroups.forEach((word) => {
      const cleanedWord = word.toLowerCase().trim().replace(".", "");

      // Exclude words in the exclusion list
      if (!excludeWords.includes(cleanedWord)) {
        if (wordCounts[cleanedWord]) {
          wordCounts[cleanedWord]++;
        } else {
          wordCounts[cleanedWord] = 1;
        }
      }
    });
  });

  // Convert the word counts to the desired format
  const result = [];
  for (const word in wordCounts) {
    result.push({ word, value: wordCounts[word] | 0 });
  }

  // Sort the result by value in descending order
  result.sort((a, b) => b.value - a.value);

  return result;
}

export type WordCloudProps = {
  title: string;
  data: { dream: number; wordgroups: string[] }[];
};

export default function WordCloud({ title, data }: WordCloudProps) {
  const options = {
    title,
    height: "800px",
    legend: {
      enabled: false,
    },
    color: {
      scale: {
        [title]: "var(--color-text)",
      },
    },
  };

  let reducedData = reduceWords(data, excludeWords);

  reducedData = reducedData.map((item: { word: string; value: number }) => {
    return { ...item, group: title };
  });

  return <WordCloudChart data={reducedData} options={options}></WordCloudChart>;
}
