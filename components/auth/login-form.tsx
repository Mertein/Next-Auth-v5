import { CardWrapper } from "@/components/auth/card-wrapper";

export const LoginForm = () => {
  return (
      <CardWrapper 
        headerLabel="Bienvenido de vuelta"
        backButtonLabel="No tienes una cuenta?"
        backButtonHref="/auth/register"
        showSocial
      >
        Login Form!
      </CardWrapper>
  )
}