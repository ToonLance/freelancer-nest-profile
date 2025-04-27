
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-brand-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Find Top Freelance Talent <br className="hidden sm:inline" />
                <span className="text-brand-600">On FreelancerNest</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Connect with skilled professionals or showcase your talents. 
                Your next opportunity is just a click away.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="rounded-full animate-slide-up">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/freelancers">
                <Button variant="outline" size="lg" className="rounded-full animate-slide-up">
                  Find Freelancers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-600 mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Verified Freelancers</h3>
              <p className="text-muted-foreground">
                Every freelancer on our platform is verified for skills and experience.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-600 mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Secure Payments</h3>
              <p className="text-muted-foreground">
                Our escrow system ensures your money is safe until you're satisfied with the work.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-600 mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">24/7 Support</h3>
              <p className="text-muted-foreground">
                Get help whenever you need it with our round-the-clock customer support team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Your Journey?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Join thousands of freelancers and businesses on FreelancerNest today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="rounded-full">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="rounded-full">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
