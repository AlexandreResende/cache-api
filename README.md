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

# Improvements to be done

[X] add more logs and meaningful ones

[X] add eslint to project

[X] use a di lib

[ ] create a DAO class for the cache entries to abstract the usage of generics on repository

[ ] add a monitoring tool

[ ] design a possible architecture for the project thinking about reliability, scalability and maintainability (system design)

[ ] use a logging tool like sentry

[ ] tests - unit and integration

[X] setup for chai on test folder

[] test rejected promises - add chai as promise

[] add retry operation for delete all cache entries when deletion failed

[] add  try/catch statement on repository - learn more about error handling

[] add swagger

[] add pipeline - github actions to project to run tests

[] improve infra setup for hosting app on cloud provider - eg heroku

[] improve documentation on how to use the API and its behaviors

[] learn more about mongodb - advantages and disadvantages