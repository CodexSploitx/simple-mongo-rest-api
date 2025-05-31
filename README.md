
# 🧩 MongoDB REST API

A modular, secure, and developer-friendly REST API for MongoDB, built with Node.js, Express, and custom middlewares.

---

## 🚀 **Key Features**

- **Dynamic Connections:** Instantly connect to any MongoDB database and collection.
- **Full CRUD Support:** Endpoints for `find`, `findOne`, `insertOne`, `updateOne`, `deleteOne` and `view all documents in a collection`
- **Token Authentication:** Secure all routes with a simple token-based middleware.
- **Parameter Validation:** Ensure valid `db` and `collection` inputs.
- **Modular Design:** Organized by HTTP method for easy extension.
- **Advanced Queries:** Flexible query and options support.
- **Consistent Errors:** Clear, actionable error messages.

---

## 📦 **Installation**

```bash
git clone https://github.com/CodexSploitx/simple-mongo-rest-api.git
cd simple-mongo-rest-api
pnpm install  # or npm install
```

Create a `.env` file:

```env
MONGO_URI=mongodb://localhost:27017
AUTH_TOKEN=your_secret_token # Generate at https://it-tools.tech/token-generator
PORT=4000
```

---

## ▶️ **Getting Started**

```bash
pnpm start  # or npm run start

# To test MongoDB connection:
pnpm test
```

Server runs at: [http://localhost:4000](http://localhost:4000)

---

## 🔐 **Authentication**

All endpoints require:

```
Authorization: Bearer your_secret_token
```

If missing or invalid, a `401 Unauthorized` is returned.

---
## 🛄 **Creating Databases and Collections**

To create a new **database** and **collection**, simply insert a document using the `/api/insertOne` endpoint. If the specified database or collection does not exist, it will be created automatically.

**Endpoint:**
```
POST http://localhost:4000/api/insertOne
```

**Request Body:**
```json
{
  "db": "yourDatabaseName",         // Name of the database to create/use
  "collection": "yourCollectionName", // Name of the collection to create/use
  "document": {
    "user": "John Smith",
    "age": 26,
    "email": "johnsmith@example.com"
  }
}
```

> **Note:**  
> Replace `"yourDatabaseName"` and `"yourCollectionName"` with your desired names.  
> The database and collection will be created automatically if they do not exist.
> The `document` field can contain any information and fields you need—there are no limits.

Once you send the request, the database and collection will be created, and your document will be inserted.


---

## 📘 **API Endpoints**

### ✴️ **GET /api/:db/:collection**

Retrieve all documents from a collection.

| Parameter    | Type    | Description        |
|--------------|---------|--------------------|
| `db`         | string  | Database name      |
| `collection` | string  | Collection name    |

**Example:**

```http
GET /api/myDatabase/users
Authorization: Bearer YOUR_AUTH_TOKEN
```

**Response:**

```json
{
  "success": true,
  "result": [
    { "_id": "...", "username": "juan", "email": "juan@email.com" },
    { "_id": "...", "username": "maria", "email": "maria@email.com" }
  ]
}
```

---

### 🔍 **POST /api/find**

Query documents with custom filters.

```json
{
  "db": "myDatabase",
  "collection": "users",
  "query": { "username": "juan" },
  "options": { "limit": 5 }
}
```

---

### 🔎 **POST /api/findOne**

Find a single document.

```json
{
  "db": "myDatabase",
  "collection": "users",
  "query": { "email": "a@a.com" }
}
```

---

### ➕ **POST /api/insertOne**

Insert a new document.

```json
{
  "db": "myDatabase",
  "collection": "users",
  "document": { "username": "lucas", "email": "lucas@mail.com" }
}
```

---

### 📝 **PUT /api/updateOne**

Update an existing document.

```json
{
  "db": "myDatabase",
  "collection": "users",
  "filter": { "username": "lucas" },
  "update": { "$set": { "email": "new@mail.com" } }
}
```

---

### ❌ **DELETE /api/deleteOne**

Delete a document.

```json
{
  "db": "myDatabase",
  "collection": "users",
  "filter": { "username": "lucas" }
}
```

---

## 🛡️ **Middleware Overview**

- **`authToken.js`**  
  Validates the token from the `Authorization` header against your `.env` value.

- **`validateMongoRequest.js`**  
  Ensures `db` and `collection` are present in the request.

---

## 📂 **Project Structure**

```
.
├── CRUD
│   ├── GET
│   │   ├── find.js
│   │   ├── findOne.js
│   │   └── getCollection.js
│   ├── POST
│   │   └── insertOne.js
│   ├── PUT
│   │   └── updateOne.js
│   └── DELETE
│       └── deleteOne.js
├── middleware
│   ├── authToken.js
│   └── validateMongoRequest.js
├── src
│   ├── server.js
│   └── test.js
└── .env
```

---

## ✅ **Why Use This API?**

- Robust token-based security
- Flexible, reusable validation
- Clean, intuitive routes and JSON bodies
- Easily extendable for user authentication or role-based access

---

## 📄 **License**

MIT © 2025

