# ============================================================
# My Shangri-La Referendum (MSLR)
# 
# ============================================================
#
# ============================================================
# IMPORTANT: HOW TO INSTALL AND RUN THE PROJECT
# ============================================================
#
# These steps are mandatory.
# Follow them in order.
# All commands must be executed exactly as shown.
#
# ------------------------------------------------------------
# INSTALL NODE.JS
# ------------------------------------------------------------
#
# Required version: Node.js v18 or later
#
# Download from:
# https://nodejs.org/
#
# Verify installation:
#
# node -v
# npm -v
#
# ------------------------------------------------------------
# EXTRACT THE ZIP FILE
# ------------------------------------------------------------
#
# After extracting the ZIP file, the folder structure MUST be:
#
# CW2-ssk53/
# └── mslr-voting-system/
#
# ------------------------------------------------------------
# IMPORTANT NOTE FOR WINDOWS USERS
# ------------------------------------------------------------
#
# On Windows, extracting the ZIP file may sometimes create
# a nested folder automatically.
#
# Example:
#
# CW2-ssk53/
# └── CW2-ssk53/
#     └── mslr-voting-system/
#
# This is normal Windows behaviour.
#
# IMPORTANT:
# Regardless of nesting, ALL commands MUST be run inside:
#
# mslr-voting-system
#
# ------------------------------------------------------------
# NAVIGATE INTO PROJECT FOLDER
# ------------------------------------------------------------
#
# cd CW2-ssk53/mslr-voting-system
#
# ------------------------------------------------------------
# INSTALL DEPENDENCIES
# ------------------------------------------------------------
#
# npm install
#
# This installs all required dependencies and creates node_modules.
#
# ------------------------------------------------------------
# START DEVELOPMENT SERVER
# ------------------------------------------------------------
#
# npm run dev
#
# If port 3000 is in use, Next.js will automatically
# select another available port (e.g. 3001).
#
# ------------------------------------------------------------
# OPEN APPLICATION
# ------------------------------------------------------------
#
# Open a browser and navigate to:
#
# http://localhost:3000
#
# The application is now running.
#
# ============================================================
# PROJECT OVERVIEW
# ============================================================
#
# My Shangri-La Referendum (MSLR) is a full-stack web application
# designed to support a secure, transparent, and fair public
# referendum system for the Valley of Shangri-La.
#
# Eligible citizens can register, authenticate, and vote in
# referendums. The Election Commission manages referendum
# creation, lifecycle, and analytics.
#
# A public REST Web Service (Task 2 – 20%) exposes anonymised
# referendum data in JSON format. The same REST API is consumed
# by the public Home Page UI.
#
# ============================================================
# TECHNOLOGY STACK
# ============================================================
#
# Framework: Next.js (App Router)
# Language: TypeScript
# Frontend: React
# Backend: Next.js API Routes
# Database: MongoDB Atlas
# ODM: Mongoose
# Authentication: JWT (HTTP-only cookies)
# Password Hashing: bcrypt
# Validation: Zod
# Forms: React Hook Form
# Styling: Tailwind CSS
# Animations: Framer Motion
# Charts & Analytics: Recharts
# QR Code Scanner: html5-qrcode
# State Management: Local React State
# Deployment: Vercel
#
# ============================================================
# USER ROLES AND IMPLEMENTED FEATURES
# ============================================================
#
# -------------------------
# VOTER FEATURES
# -------------------------
#
# - User registration with:
#   - Name
#   - Email
#   - Password
#   - Date of Birth
#   - Shangri-La Citizen Code (SCC)
#
# - SCC can be:
#   - Entered manually
#   - Scanned using a QR code
#
# - Secure login using JWT authentication
# - Access to voter dashboard
# - View all open referendums
# - Vote once per referendum
# - Vote duplication is blocked
# - View closed referendum results
# - Votes are immutable once submitted
#
# -------------------------
# ELECTION COMMISSION FEATURES
# -------------------------
#
# - Secure Election Commission login (predefined account)
# - Create new referendums
# - Edit referendums while in Draft state
# - Open referendums for public voting
# - Automatic referendum closure when:
#   - 50% of eligible voters vote for one option
# - Manually close referendums
# - Delete draft referendums only
# - Prevent deletion of open referendums
# - View live vote counts
# - View graphical analytics dashboards
#
# ============================================================
# ELECTION COMMISSION LOGIN (IMPORTANT)
# ============================================================
#
# The Election Commission account is predefined.
# No registration is required.
#
# Login credentials:
#
# Email: ec@referendum.gov.sr
# Password: Shangrilavote&2025@
#
# Login via:
# /auth
#
# ============================================================
# REFERENDUM LIFECYCLE AND BUSINESS LOGIC
# ============================================================
#
# - All referendums start in Draft state
# - Draft referendums can be edited or deleted
# -Created Referedum gets stored in draft EC should view that ceated refrendum and open it  .
# - Once opened:
#   - Referendum content becomes read-only
# - Referendums close when:
#   - 50% threshold is reached automatically, OR
#   - Election Commission manually closes it
# - Closed referendums cannot be modified
#
# ------------------------------------------------------------
# CLARIFICATION: REFERENDUM VISIBILITY AND STATE TRANSITION
# ------------------------------------------------------------
#
# - Newly created referendums are initially in Draft state
# - Draft referendums are visible only to the Election Commission
# - The Election Commission must manually open a referendum
# - Only Open referendums appear on the voter dashboard
# - Once opened, a referendum cannot be edited or deleted
#
# ============================================================
# QR CODE (SCC) FEATURE
# ============================================================
#
# - Each Shangri-La Citizen Code (SCC) is unique
# - SCC can be scanned using a QR code
# - SCC must exist in the database
# - Each SCC can only be used once
# - SCC is invalidated immediately after successful registration
#
# ============================================================
# TASK 2 – REST WEB SERVICE (20%)
# ============================================================
#
# Public REST API endpoints implemented:
#
# GET /mslr/referendums?status=open
# GET /mslr/referendums?status=closed
# GET /mslr/referendums/{id}
#
# Returned JSON includes:
# - Referendum ID
# - Status
# - Title
# - Description
# - Options
# - Vote counts per option
#
# The public Home Page UI consumes these same endpoints.
#
# ============================================================
# PUBLIC HOME PAGE AND MSLR SECTION
# ============================================================
#
# - Public users can view open referendums
# - Public users can view closed referendums
# - Referendums can be accessed:
#   - Through UI navigation
#   - Directly via URL using referendum ID
# - UI uses the same REST API as Task 2
#
# ============================================================
# ENVIRONMENT VARIABLES
# ============================================================
#
# The project includes a .env file for coursework evaluation.
#
# Example variables:
# - MONGODB_URI
# - JWT_SECRET
#
# The .env file is intentionally included so the
# application runs immediately after installation.
#
# ============================================================
# PRE-CREATED TEST USERS
# ============================================================
#
# Password for all test voters:
# 12345678
#
# Example users:
# - Suhel Khan – t2@gmail.com
# - Pema Dolma – t3@gmail.com
# - Yasmin Khan – t4@gmail.com
# - Karma Lhamo – t5@gmail.com
# - Sameer Khan – sk@gmail.com
# - shailesh - shaielsh@gmail.com
#
# Some SCCs are already marked as used and cannot be reused:
#
# 1AZN0FXJVM
# JOV50TOSYR
# YFUVLYBQZR
# 12EOU5RGVX
# 0IXYCAH8UW
# IKKSZYJTSH
# R2ZHBUYO2V
#
# ============================================================
# SECURITY MEASURES
# ============================================================
#
# - Passwords hashed using bcrypt
# - JWT stored in HTTP-only cookies
# - Role-based access control enforced server-side
# - Zod validation on all inputs
# - Votes are immutable once submitted
#
# ============================================================
# DEPLOYMENT
# ============================================================
#
# The application has been deployed on Vercel
# for validation and testing purposes.
#
# ============================================================
# FINAL STATUS
# ============================================================
#
# - Task 1 completed
# - Task 2 REST API fully compliant
# - UI consumes REST endpoints
# - QR code feature implemented
# - 50% automatic closure implemented
# - Secure authentication implemented
# - Deployment successful
#
# ============================================================
# AUTHOR
# ============================================================
#
# ssk53
# University of Leicester
#
# ============================================================
