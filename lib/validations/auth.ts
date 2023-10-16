import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin."),
})

export const userAuthCredentialsSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8, "Şifreniz en az 8 karakter uzunluğunda olmalıdır."),  // Example validation
});

export const userLoginSchema = z.object({
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin."),
  password: z.string().min(8, "Şifreniz en az 8 karakter uzunluğunda olmalıdır."),  // Example validation
})