interface Props {
  title: string;
  children: React.ReactNode;
}

export default function PageSection({ title, children }: Props) {
  return (
    <section className="flex flex-col gap-6 md:gap-9 w-full relative">
      <h2 className="text-3xl font-medium">{title}</h2>
      {children}
    </section>
  );
}
