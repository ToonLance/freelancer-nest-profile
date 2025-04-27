
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Calendar, Briefcase, Award, Mail } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfileData {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  username: string | null;
  createdAt: any;
  updatedAt: any;
  bio?: string;
  location?: string;
  skills?: string[];
  title?: string;
}

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!username) {
        setError('Username not provided');
        setLoading(false);
        return;
      }
      
      try {
        // First, find the user ID associated with the username
        const usernameDocRef = doc(db, 'usernames', username);
        const usernameDoc = await getDoc(usernameDocRef);
        
        if (!usernameDoc.exists()) {
          setError('Profile not found');
          setLoading(false);
          return;
        }
        
        const uid = usernameDoc.data().uid;
        
        // Now fetch the user profile data
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);
        
        if (!userDoc.exists()) {
          setError('Profile data not found');
          setLoading(false);
          return;
        }
        
        const userData = userDoc.data() as UserProfileData;
        setProfileData(userData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [username]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container py-10">
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-16 w-16"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="container py-10">
          <div className="flex flex-col items-center justify-center h-64">
            <h1 className="text-2xl font-bold mb-4">{error}</h1>
            <p className="text-muted-foreground mb-6">
              The profile you're looking for doesn't exist or cannot be loaded.
            </p>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!profileData) {
    return null;
  }
  
  const isOwnProfile = currentUser && currentUser.uid === profileData.uid;
  const joinDate = profileData.createdAt ? new Date(profileData.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown';
  
  return (
    <Layout>
      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={profileData.photoURL || undefined} alt={profileData.displayName || "User"} />
                    <AvatarFallback className="text-2xl">
                      {profileData.displayName ? profileData.displayName[0].toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h1 className="text-2xl font-bold">{profileData.displayName}</h1>
                  <p className="text-muted-foreground">@{profileData.username}</p>
                  
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm">No reviews yet</span>
                  </div>
                  
                  {profileData.title && (
                    <div className="mt-4 text-center">
                      <p className="font-medium">{profileData.title}</p>
                    </div>
                  )}
                  
                  {profileData.location && (
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{profileData.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Joined {joinDate}</span>
                  </div>
                  
                  <div className="w-full mt-6">
                    {isOwnProfile ? (
                      <Button variant="outline" className="w-full" onClick={() => navigate('/edit-profile')}>
                        Edit Profile
                      </Button>
                    ) : (
                      <Button className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">About</h2>
                {profileData.bio ? (
                  <p>{profileData.bio}</p>
                ) : (
                  <p className="text-muted-foreground">
                    {isOwnProfile 
                      ? "Add a bio to tell others about yourself..." 
                      : "This user hasn't added a bio yet."}
                  </p>
                )}
                
                <Separator className="my-6" />
                
                <h2 className="text-xl font-bold mb-4">Skills</h2>
                {profileData.skills && profileData.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <div key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                        {skill}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {isOwnProfile 
                      ? "Add some skills to showcase your expertise..." 
                      : "This user hasn't added any skills yet."}
                  </p>
                )}
                
                <Separator className="my-6" />
                
                <h2 className="text-xl font-bold mb-4">Work Experience</h2>
                <div className="flex flex-col items-center justify-center h-40 border rounded-md bg-muted/50">
                  <Briefcase className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No experience listed</p>
                  <p className="text-xs text-muted-foreground">
                    {isOwnProfile 
                      ? "Add your work experience to enhance your profile" 
                      : "This user hasn't added any work experience yet."}
                  </p>
                </div>
                
                <Separator className="my-6" />
                
                <h2 className="text-xl font-bold mb-4">Portfolio</h2>
                <div className="flex flex-col items-center justify-center h-40 border rounded-md bg-muted/50">
                  <Award className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No portfolio items</p>
                  <p className="text-xs text-muted-foreground">
                    {isOwnProfile 
                      ? "Add projects to showcase your work" 
                      : "This user hasn't added any portfolio items yet."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
