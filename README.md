
#install

```pnpm install```

#db

```docker run -d  --name mongo-on-docker-cryptowatch  -p 27888:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo```

#run
``` pnpm run serve:all```