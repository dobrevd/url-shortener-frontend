# 🔗 URL Shortener Service Frontend

## 📝 Overview

The **URL Shortener Service Frontend** is the frontend component of a microservice-based URL shortening application.  
It allows users to convert long referral links from our platform into compact, shareable URLs.  
This is especially useful for sharing on platforms like social media, where shorter links improve appearance and usability.

Backend source code is available at:  
👉 [GitHub - dobrevd/url_shortener_service](https://github.com/dobrevd/url_shortener_service)

## 🛠 GitHub Actions: CI/CD Workflow for Angular App

This GitHub Actions workflow is configured to **automatically build, test, and publish a Docker image** of the project  to **Docker Hub** whenever changes are pushed to the `main` branch.

### ✅ What the Workflow Does

1. **Trigger**
   - Runs on every `push` to the `main` branch.

2. **Job: `build`**
   - ✅ Checks out the project code.
   - 🧰 Sets up **Node.js v18**.
   - 📦 Installs dependencies using `npm ci`.
   - 🛠 Builds the Angular app in **production** mode:  
     ```bash
     npm run build -- --configuration production
     ```
   - 🧪 Runs unit tests with Headless Chrome:  
     ```bash
     npm test -- --watch=false --browsers=ChromeHeadless
     ```

3. **Job: `docker`**
   - 🕓 Runs **after** the `build` job completes successfully.
   - 🔐 Logs in to **Docker Hub** using GitHub secrets.
   - 🐳 Builds the Docker image using the provided `Dockerfile`.

### 🔐 Required GitHub Secrets

To push to Docker Hub, add the following secrets to repository:

| Secret Name          | Description                            |
|----------------------|----------------------------------------|
| `DOCKERHUB_USERNAME` | Docker Hub username                    |
| `DOCKERHUB_TOKEN`    | Docker Hub access token (not password) |

---

