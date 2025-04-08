export default function TextBlock({ block }) {
  const text = block.content[0];
  return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
}
