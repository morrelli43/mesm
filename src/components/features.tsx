import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface FeaturesProps {
  feature1Title: string;
  feature1Content: string;
  feature2Title: string;
  feature2Content: string;
  feature3Title: string;
  feature3Content: string;
}

export function Features({
  feature1Title,
  feature1Content,
  feature2Title,
  feature2Content,
  feature3Title,
  feature3Content,
}: FeaturesProps) {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{feature1Title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{feature1Content}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{feature2Title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{feature2Content}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{feature3Title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{feature3Content}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
