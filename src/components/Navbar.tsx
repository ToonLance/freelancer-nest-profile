
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, LogOut, User, Settings } from 'lucide-react';

export function Navbar() {
  const { currentUser, userProfile, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-brand-600 text-white font-bold rounded-md p-1.5">FN</div>
          <span className="font-bold text-xl hidden sm:inline-block">
            FreelancerNest
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/freelancers" className="transition-colors hover:text-primary">
            Find Freelancers
          </Link>
          <Link to="/jobs" className="transition-colors hover:text-primary">
            Browse Jobs
          </Link>
          <Link to="/about" className="transition-colors hover:text-primary">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || "User"} />
                    <AvatarFallback>{
                      currentUser.displayName
                        ? currentUser.displayName.substring(0, 2).toUpperCase()
                        : "UN"
                    }</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                    {userProfile?.username && (
                      <p className="text-xs leading-none text-brand-500">@{userProfile.username}</p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer w-full flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/profile/${userProfile?.username || 'setup-username'}`} className="cursor-pointer w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link to="/signup" className="hidden sm:block">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
