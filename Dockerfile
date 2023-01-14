FROM public.ecr.aws/lambda/nodejs:16 as builder
WORKDIR /usr/app
COPY ./  ./
RUN npm ci
RUN npm run build


FROM public.ecr.aws/lambda/nodejs:16
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/node_modules/ ./
COPY --from=builder /usr/app/dist/ ./
CMD ["app.handler"]