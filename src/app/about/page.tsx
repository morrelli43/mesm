import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg">
        This will describe the history of the company. It started from the
        understanding that the current state of eScooter repairs were not
        meeting the needs of the owners. The standard of care and convenience
        was not as high as it could be. The technicians at Melbourne eScooter
        Mechanic are defining the standard for Melbourne. With deep technical
        knowledge for how these machines work and can combine this with the
        convenience of a mobile service there is no other company that can
        compete with that level of service.
      </p>
    </div>
  );
}
