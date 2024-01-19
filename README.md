Tour de App 24 - Team ABC123

## Project setup

Install all dependencies:
```bash
npm install
```

Run dev server locally:
```bash
npm run dev
```

Run DB GUI locally:
```bash
npx prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker
Docker build:
```bash
docker build -t tda24_abc123 .
```

Docker run:
```bash
docker run -p 3000:3000 -d tda24_abc123
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.