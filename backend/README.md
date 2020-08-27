
To setup locally

npm install

npm run seed(needs only to be run the first time setting up to fill mongodb with user data)

routes

"/EmailCheck"
```
// expects
{
    "email":string
}

// when the email is not registered
{
        success: false,
        message: "User not found",
}
// when the email is valid
{
    success: true,
    message: "generate certificate"
}
```

"/generate"
```
// expects
name: string,
email: string

// when the email is not valid
{
        success: false,
        message: "User not found",
}
// when the certificate has been generated
{
        success: false,
        message: "certificate has been downloaded",
}

```