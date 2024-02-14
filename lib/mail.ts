import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink =  `${domain}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Restablecer contraseña',
    html: `<p>Click <a href=${resetLink}>aqui</a> para restablecer la contraseña</p>`
  });
}


export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Verificación de email',
    html: `<p>Click <a href=${confirmLink}>aqui</a> para verificar tu email</p>`
  });
};

