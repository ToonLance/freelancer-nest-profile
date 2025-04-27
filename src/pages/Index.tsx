
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ChevronRight } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container relative">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="glass-card inline-flex items-center px-6 py-2">
              <span className="text-sm text-white/80">✨ Your next opportunity awaits</span>
            </div>
            
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Find Top Freelance Talent On{' '}
              <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                FreelancerNest
              </span>
            </h1>
            
            <p className="max-w-[42rem] leading-normal text-white/60 sm:text-xl sm:leading-8">
              Connect with skilled professionals or showcase your talents. 
              Built for modern freelancers and businesses seeking quality work.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" variant="default" className="group hover:shadow-white/20">
                  Get Started Free 
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="hover:bg-white/5">
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-t border-white/10">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="glass-card p-8 hover-effect">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 mb-6">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Freelancers</h3>
              <p className="text-white/60">
                Every freelancer undergoes thorough verification for skills and experience, ensuring quality work delivery.
              </p>
            </div>
            
            <div className="glass-card p-8 hover-effect">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 mb-6">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
              <p className="text-white/60">
                Our escrow system ensures your money is protected until you're completely satisfied with the delivered work.
              </p>
            </div>
            
            <div className="glass-card p-8 hover-effect">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 mb-6">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-white/60">
                Access round-the-clock customer support to help you resolve any issues and ensure smooth project delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/10">
        <div className="container">
          <div className="glass-card p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="mx-auto max-w-[600px] text-white/60 mb-8">
              Join thousands of freelancers and businesses already growing with FreelancerNest.
              Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="min-w-[200px]">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="min-w-[200px]">
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
