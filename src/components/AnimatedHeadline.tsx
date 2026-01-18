"use client";

interface AnimatedHeadlineProps {
  text: string;
  className?: string;
}

export default function AnimatedHeadline({
  text,
  className = "",
}: AnimatedHeadlineProps) {
  const words = text.split(' ').map((word, index) => (
    <span key={index}>
      {word}
    </span>
  ));

  return (
    <h2 id="headline" className={className}>
      {words.reduce((acc: JSX.Element[], word, index) => {
        if (index > 0) acc.push(<span key={`space-${index}`}> </span>);
        acc.push(word);
        return acc;
      }, [])}
    </h2>
  );
}