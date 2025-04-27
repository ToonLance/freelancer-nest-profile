
import { Layout } from '@/components/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  MessageSquare, 
  Bell, 
  Star,
  Award,
  DollarSign,
  Users,
  Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { userProfile } = useAuth();
  
  return (
    <ProtectedRoute>
      <Layout>
        <div className="container py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {userProfile?.displayName || 'Freelancer'}</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link to={`/profile/${userProfile?.username}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  View Public Profile
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0.00</div>
                <p className="text-xs text-muted-foreground">
                  +0% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  0 due this week
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">N/A</div>
                <p className="text-xs text-muted-foreground">
                  0 total reviews
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-40 border rounded-md bg-muted/50">
                  <Clock className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No recent activity</p>
                  <p className="text-xs text-muted-foreground">
                    Your activity will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommended Jobs</CardTitle>
                <CardDescription>Jobs matching your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-40 border rounded-md bg-muted/50">
                  <Briefcase className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No jobs to display</p>
                  <p className="text-xs text-muted-foreground">
                    Update your skills to receive job recommendations
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Dashboard;
