import json
from collections import Counter
import re

def word_count(text):
    # List of common stop words
    stop_words = set([
        "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves",
        "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their",
        "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was",
        "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and",
        "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between",
        "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off",
        "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both",
        "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too",
        "very", "s", "t", "can", "will", "just", "don", "should", "now"
    ])

    # Use regular expression to split the text into words and filter out stop words
    words = re.findall(r'\b\w+\b', text.lower())
    words = [word for word in words if word not in stop_words]

    # Count the occurrences of each word
    word_counts = Counter(words)

    # Convert the Counter object into a list of dictionaries
    word_list = [{'word': word, 'value': count} for word, count in word_counts.items()]
    return word_list

def save_to_json(word_list, filename):
    with open(filename, 'w') as json_file:
        json.dump(word_list, json_file, indent=4)

def main():
    input_file = input("Enter the path of the text file: ")
    output_file = input("Enter the path where you want to save the JSON file: ")

    try:
        with open(input_file, 'r') as file:
            text = file.read()
            word_list = word_count(text)
            save_to_json(word_list, output_file)
        print("JSON file has been successfully created.")
    except FileNotFoundError:
        print("File not found. Please check the file path.")

if __name__ == "__main__":
    main()
