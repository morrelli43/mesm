interface IntroductoryCopyProps {
  content: string;
}

export function IntroductoryCopy({ content }: IntroductoryCopyProps) {
  const lines = content.split('\n');
  let currentElement: React.ReactNode[] = [];
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  let inList = false;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('•')) {
      if (!inList) {
        if (currentElement.length > 0) {
          elements.push(
            <div key={`text-${index}`} className="mb-6">
              {currentElement}
            </div>
          );
          currentElement = [];
        }
        inList = true;
        listItems = [];
      }
      listItems.push(
        <li key={index} className="mb-2">
          {trimmedLine.substring(1).trim()}
        </li>
      );
    } else if (trimmedLine === '') {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="mb-6 space-y-2 text-gray-700">
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      } else if (currentElement.length > 0) {
        elements.push(
          <div key={`text-${index}`} className="mb-6">
            {currentElement}
          </div>
        );
        currentElement = [];
      }
    } else {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="mb-6 space-y-2 text-gray-700">
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      }
      currentElement.push(
        <p key={index} className="text-lg text-gray-700 leading-relaxed">
          {trimmedLine}
        </p>
      );
    }
  });

  // Handle remaining content
  if (inList && listItems.length > 0) {
    elements.push(
      <ul key="final-list" className="mb-6 space-y-2 text-gray-700">
        {listItems}
      </ul>
    );
  } else if (currentElement.length > 0) {
    elements.push(
      <div key="final-text" className="mb-6">
        {currentElement}
      </div>
    );
  }

  return (
    <section className="w-full py-20">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-6">
          {elements}
        </div>
      </div>
    </section>
  );
}