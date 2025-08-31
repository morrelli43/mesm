import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Features() {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Best eScooter Technicians</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our technicians are the best in Melbourne, with years of
                experience.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mobile Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We come to you, so you don&apos;t have to transport your
                scooter. Weather permitting!
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Years of Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We have years of experience repairing all makes and models of
                eScooters.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
