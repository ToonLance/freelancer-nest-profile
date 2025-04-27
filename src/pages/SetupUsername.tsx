
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Loader2 } from 'lucide-react';

const SetupUsername = () => {
  const { currentUser, userProfile, setUsername, checkUsernameAvailability } = useAuth();
  const [usernameInput, setUsernameInput] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // Redirect if not logged in or username already set
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (userProfile?.username) {
      navigate('/dashboard');
    }
  }, [currentUser, userProfile, navigate]);

  // Debounced username check
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (usernameInput.length >= 3) {
        setIsChecking(true);
        const available = await checkUsernameAvailability(usernameInput);
        setIsAvailable(available);
        setIsChecking(false);
      } else {
        setIsAvailable(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [usernameInput, checkUsernameAvailability]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (usernameInput.length < 3 || !isAvailable || isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);
    await setUsername(usernameInput);
    setIsSubmitting(false);
  };

  return (
    <Layout withFooter={false}>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Choose a username</h1>
            <p className="text-gray-500">
              Your username will be used for your unique profile URL
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <Input 
                  id="username" 
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value.trim().toLowerCase())}
                  placeholder="Enter a unique username"
                  className="pr-10"
                  minLength={3}
                  pattern="^[a-z0-9_-]+$"
                  title="Lowercase letters, numbers, dashes, and underscores only"
                  required
                />
                {isChecking && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                )}
                {!isChecking && isAvailable === true && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                )}
                {!isChecking && isAvailable === false && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <X className="h-4 w-4 text-red-500" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Only lowercase letters, numbers, dashes, and underscores.
              </p>
              {isAvailable === false && (
                <p className="text-xs text-red-500">
                  This username is already taken. Please choose another.
                </p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={usernameInput.length < 3 || !isAvailable || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting username...
                </>
              ) : (
                'Set Username & Continue'
              )}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SetupUsername;
