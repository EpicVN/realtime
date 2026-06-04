# Dùng hệ điều hành Alpine
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

COPY public ./public
COPY .next/standalone ./
COPY .next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]