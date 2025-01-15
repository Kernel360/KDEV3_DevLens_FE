import Heading from "../ui/heading";

export default function SectionTitle({ children }: { children: string }) {
  return (
    <>
      <Heading as="h2" className="mb-4">
        {children}
      </Heading>
    </>
  );
}
