# My Shangri-La Referendum (MSLR)

A full-stack web application designed to support a secure, transparent, and fair public referendum system for the Valley of Shangri-La.

---

## 🚀 Installation and Setup

### Prerequisites

**Required:** Node.js v18 or later

Download from: [https://nodejs.org/](https://nodejs.org/)

Verify installation:
```bash
node -v
npm -v
```

### Project Structure

After extracting the ZIP file, the folder structure MUST be:
```
CW2-ssk53/
└── mslr-voting-system/
```

> **⚠️ Note for Windows Users:**
> 
> On Windows, extracting the ZIP file may create a nested folder automatically:
> ```
> CW2-ssk53/
> └── CW2-ssk53/
>     └── mslr-voting-system/
> ```
> This is normal behavior. Regardless of nesting, ALL commands MUST be run inside `mslr-voting-system`.

### Installation Steps

1. **Navigate to project folder:**
   ```bash
   cd CW2-ssk53/mslr-voting-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   > If port 3000 is in use, Next.js will automatically select another available port (e.g., 3001).

4. **Open application:**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Project Overview

My Shangri-La Referendum (MSLR) is a full-stack web application that enables:

- Secure citizen registration and authentication
- Public referendum creation and management
- Transparent voting system
- Real-time analytics and reporting
- Public REST API for referendum data

Eligible citizens can register, authenticate, and vote in referendums. The Election Commission manages referendum creation, lifecycle, and analytics.

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Frontend** | React |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB Atlas |
| **ODM** | Mongoose |
| **Authentication** | JWT (HTTP-only cookies) |
| **Password Hashing** | bcrypt |
| **Validation** | Zod |
| **Forms** | React Hook Form |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **QR Scanner** | html5-qrcode |
| **Deployment** | Vercel |

---

## 👥 User Roles and Features

### Voter Features

- **Registration** with:
  - Name
  - Email
  - Password
  - Date of Birth
  - Shangri-La Citizen Code (SCC)
    - Can be entered manually
    - Can be scanned using QR code
- Secure login using JWT authentication
- Access to voter dashboard
- View all open referendums
- Vote once per referendum (duplication blocked)
- View closed referendum results
- Immutable votes once submitted

### Election Commission Features

- Secure login (predefined account)
- Create new referendums
- Edit referendums in Draft state
- Open referendums for public voting
- **Automatic referendum closure** when 50% of eligible voters vote for one option
- Manually close referendums
- Delete draft referendums only (open referendums cannot be deleted)
- View live vote counts
- View graphical analytics dashboards

---

## 🔐 Election Commission Login

The Election Commission account is predefined. No registration required.

**Login Credentials:**
```
Email: ec@referendum.gov.sr
Password: Shangrilavote&2025@
```

**Login URL:** `/auth`

---

## 🔄 Referendum Lifecycle

```
Draft → Open → Closed
```

### State Transitions

1. **Draft State**
   - Newly created referendums start here
   - Visible only to Election Commission
   - Can be edited or deleted
   - Must be manually opened by EC

2. **Open State**
   - Visible to all voters
   - Content becomes read-only
   - Cannot be edited or deleted
   - Voters can cast votes

3. **Closed State**
   - Automatically closes when 50% threshold reached
   - Can be manually closed by EC
   - Results visible to public
   - Cannot be modified

---

## 📱 QR Code (SCC) Feature

- Each Shangri-La Citizen Code (SCC) is unique
- SCC can be scanned using QR code
- SCC must exist in database
- Each SCC can only be used once
- SCC is invalidated immediately after successful registration

---

## 🌐 REST Web Service (Task 2 – 20%)

### Public API Endpoints

```http
GET /mslr/referendums?status=open
GET /mslr/referendums?status=closed
GET /mslr/referendums/{id}
```

### JSON Response Includes:
- Referendum ID
- Status
- Title
- Description
- Options
- Vote counts per option

> **Note:** The public Home Page UI consumes these same endpoints.

---

## 🏠 Public Home Page

Public users can:
- View open referendums
- View closed referendums
- Access referendums through UI navigation
- Access referendums directly via URL using referendum ID

UI uses the same REST API as Task 2.

---

## 🔧 Environment Variables

The project includes a `.env` file for coursework evaluation.

Example variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> **Note:** The `.env` file is intentionally included so the application runs immediately after installation.

---

## 👤 Pre-created Test Users

### Test Voter Accounts

**Password for all test voters:** `12345678`

| Name | Email |
|------|-------|
| Suhel Khan | t2@gmail.com |
| Pema Dolma | t3@gmail.com |
| Yasmin Khan | t4@gmail.com |
| Karma Lhamo | t5@gmail.com |
| Sameer Khan | sk@gmail.com |
| Shailesh | shaielsh@gmail.com |

### Used SCCs (Cannot be Reused)

```
1AZN0FXJVM
JOV50TOSYR
YFUVLYBQZR
12EOU5RGVX
0IXYCAH8UW
IKKSZYJTSH
R2ZHBUYO2V
```

---

## 🔒 Security Measures

- ✅ Passwords hashed using bcrypt
- ✅ JWT stored in HTTP-only cookies
- ✅ Role-based access control enforced server-side
- ✅ Zod validation on all inputs
- ✅ Votes are immutable once submitted

---

## 🚀 Deployment

The application has been deployed on **Vercel** for validation and testing purposes.

---

## ✅ Project Status

- ✅ Task 1 completed
- ✅ Task 2 REST API fully compliant
- ✅ UI consumes REST endpoints
- ✅ QR code feature implemented
- ✅ 50% automatic closure implemented
- ✅ Secure authentication implemented
- ✅ Deployment successful

---

## 👨‍💻 Author

**ssk53**  
University of Leicester

---

## 📄 License

This project is submitted as coursework for University of Leicester.
