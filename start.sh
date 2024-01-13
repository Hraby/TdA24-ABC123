#!/bin/bash

npx prisma generate
npx prisma db push
node server.js