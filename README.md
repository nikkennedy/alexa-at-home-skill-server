# alexa-at-home-skill-server
A nodejs server for developing/running your own amazon alexa skills very easily using the Amazon alexa-sdk. So there is no need to keep uploading code to an AWS Lambda system, all your code now remains on your server.

1. Clone a copy of this repository
```bash
git clone https://github.com/nikkennedy/alexa-at-home-skill-server.git
cd alexa-at-home-skill-server
npm install
```

2. Change config.js to match your own internal network port that routes to an internet accessable https 443 port 

3. Add your SSL certificate and private key to the sslcert directory - these can be got from [Lets Encrypt](https://letsencrypt.org) for free.

4. Set up the hello world skill as described by Amazon's Alexa SDK guide but make the endpoint go to your server rather than AWS lambda

5. Run the server

```bash
node server.js
```

6. Tell alexa to say 'hello world'

7. Create your own skills


