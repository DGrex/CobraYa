import { useAuthActions } from "@/hooks/use-auth-actions";
import { toast } from "sonner";
import { CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { Link } from "react-router";

interface Props {
  type: "login" | "register";
  loading: boolean;
}
const CardFooterAuth = ({ type, loading }: Props) => {
  const isLogin = type === "login";
  const { loginWithGoogle } = useAuthActions();

  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle();
    if (!result.success) {
      toast.error("Login Fallido", { description: "error" });
    }
  };

  return (
    <CardFooter
      className="
            flex
            flex-col
            items-center
            gap-4
        "
    >
      <Button
        onClick={handleLoginWithGoogle}
        className="w-full"
        disabled={loading}
        variant="outline"
      >
        {isLogin ? "Continuar con Google" : "Registrarse con Google"}
        <Mail className="mr-2" />
      </Button>
      <p
        className="
             text-center
             text-sm
             text-muted-foreground
            "
      >
        {isLogin ? "No tienes una cuenta" : "Ya tienes una cuenta?"}
        <Link to={isLogin ? "/auth/register" : "/auth/login"}>
          <Button variant="link" className="ml-0.5 p-0 h-auto font-normal">
            {isLogin ? "Registro" : "Iniciar sesión"}
          </Button>
        </Link>
      </p>
    </CardFooter>
  );
};

export default CardFooterAuth;
