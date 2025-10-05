import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const senhaCriptografada = await bcrypt.hash("123456", 10);

  await prisma.usuarios.upsert({
    where: { email: "admin@caramelo.com" },
    update: {},
    create: {
      nome: "Admin",
      telefone: "11999999999",
      email: "admin@caramelo.com",
      senha: senhaCriptografada,
      usuarioAdmin: true
    },
  });

  console.log("👑 Usuário admin criado com sucesso!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
