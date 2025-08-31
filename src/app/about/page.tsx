import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      
      <div className="max-w-4xl space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg leading-relaxed">
            Our company started from the understanding that the current state of eScooter repairs were not 
            meeting the needs of the owners. The standard of care and convenience was not as high as it could be.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Setting the Standard</h2>
          <p className="text-lg leading-relaxed">
            The technicians at Melbourne eScooter Mechanic are defining the standard for Melbourne. 
            With deep technical knowledge for how these machines work and the convenience of a mobile service, 
            no other company can compete with that level of service.
          </p>
        </section>
      </div>
    </div>
  );
}
