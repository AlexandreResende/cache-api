# cache-api

## To run the project you just need to

```
docker-compose up
```

## This command will up the server and the database and is ready to be requested


# TTL strategy

1- On first iteration we will create an index on mongodb with the `expireAfterSeconds` key to a spepcific value

2- On second iteration the strategy we will use a key which name will be `recordedAt` and its value will be a timestamp
  - We will use this field to check the record and build the TTL logic around it
  - When we reach the maximum amount of records, we will substitute the record with the oldest `recordedAt` value

```
Topics that need more improvements

- The number of entries allowed in the cache is limited. If the maximum amount of
cached items is reached, some old entry needs to be overwritten (Please explain the
approach of what is overwritten in the comments of the source code)
- Every cached item has a Time To Live (TTL). If the TTL is exceeded, the cached data will
not be used. A new random value will then be generated (just like cache miss). The TTL
will be reset on every read/cache hit
```