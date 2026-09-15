type SectionHeadingProps = { index: string; label: string; detail?: string };

export function SectionHeading({ index, label, detail }: SectionHeadingProps) {
  return <div className="section-heading"><span>{index} / {label}</span>{detail ? <p>{detail}</p> : null}</div>;
}
