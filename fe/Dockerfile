# --- 1단계: 빌드 ---
FROM node:18-alpine AS builder

WORKDIR /app
COPY . /app

RUN npm install

RUN npm run build

# --- 2단계: 실행 ---
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app /app

EXPOSE 3000

CMD ["npm", "start"]