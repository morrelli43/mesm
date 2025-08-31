# FAQ Component Usage

The FAQ component allows you to display frequently asked questions anywhere on the site using content from the database.

## Basic Usage

```tsx
import { FAQ } from "@/components/faq";
import { getFAQContent } from "@/lib/content";

export default async function YourPage() {
  const faqItems = await getFAQContent();

  return (
    <div>
      {/* Show all FAQ items */}
      <FAQ items={faqItems} title="Frequently Asked Questions" />
      
      {/* Show only first 3 FAQ items */}
      <FAQ items={faqItems.slice(0, 3)} title="Common Questions" />
      
      {/* Custom styling */}
      <FAQ 
        items={faqItems} 
        title="Help & Support" 
        className="bg-gray-50" 
      />
    </div>
  );
}
```

## FAQ Data Structure

Each FAQ item contains:
- `question`: String - The question text
- `answer`: String - The answer text

## Database Content

FAQ content is stored in the `page_content` table with:
- `page`: 'faq'
- `section`: 'question_1', 'answer_1', 'question_2', 'answer_2', etc.
- `content`: The actual question or answer text

## Available Pages

- `/faq` - Standalone FAQ page with all questions
- Components can use `getFAQContent()` to fetch and display FAQ sections anywhere