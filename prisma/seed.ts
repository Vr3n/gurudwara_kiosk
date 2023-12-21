import { PrismaClient} from '@prisma/client'
import { hash } from 'bcrypt'
const prisma = new PrismaClient()

async function main(){
    const password =  hash('test', 12)
    const user = await prisma.user.upsert({
        where :{email: 'test@test.com'},
        update: {},
        create: {
            email: 'test@test.com',
            name: 'Test user',
            password
        }
    })
    console.log({user})
}

main()
    .then(()=> prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
    })
