# Express Server

## Prisma

Having the postgres instance up and running run the following commands to initialize the schema:

```bash
npx prisma init
npx prisma migrate dev --name "init" --preview-feature
```