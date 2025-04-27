
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <div className="bg-brand-600 text-white font-bold rounded-md p-1.5">FN</div>
              <span className="font-bold text-xl">FreelancerNest</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Connect with talented freelancers and find exciting opportunities to showcase your skills.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">For Clients</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/find-freelancers" className="text-muted-foreground hover:text-foreground">
                  Find Freelancers
                </Link>
              </li>
              <li>
                <Link to="/post-job" className="text-muted-foreground hover:text-foreground">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">For Freelancers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jobs" className="text-muted-foreground hover:text-foreground">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-foreground">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-foreground">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FreelancerNest. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/cookies" className="hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
