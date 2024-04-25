## Appwrite

we have a facility called `Teams` with a specified user roles machanism where we can add existing user as member and specify them some roles. As of today, only api keys have `team:write` and and `team:read` permission so we have to create NextJS api for managing teams and it's members. We have created different service for using in server with `node-appwrite` package.

### Note:- Since appwrite didn't update their cloud version yet, we have to use `appwrite@13.0.2` instead of `appwrite@14`.

## Cloudinary

- we have to explicitely add-on `AI Background Removal` plugin in cloudinary to make it work.
- Remove background comes with only 15 images per month for free.
- for gravity values, [click here](https://cloudinary.com/documentation/gravity_transformations_tutorial) to know.
