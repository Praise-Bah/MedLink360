import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="mb-4 text-4xl font-bold text-foreground">MedLink360</h1>
        <p className="text-xl text-muted-foreground">Hospital Management System</p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link to="/auth/signin">Sign In</Link>
          </Button>
          <Button variant ="outline" asChild>
            <Link to="/auth/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
