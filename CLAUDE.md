text
IMPORTANT:

Do NOT generate bash scripts.
Do NOT generate Python scripts.
Do NOT generate shell commands that create files.

Instead, output the COMPLETE CONTENT of each file.

For every file:

1. Show the relative file path.
2. Then show the complete code.
3. Move to the next file.

Example:

src/app/p2p/page.tsx

```tsx
// complete code here
````

Then continue to the next file.

Never output automation scripts.
Never output mkdir commands.
Never output Python.
Never output Bash.

Assume I am manually creating the files in VS Code.

You are the lead frontend engineer for TaboFins.

IMPORTANT:

Do NOT redesign the application.

The landing page, authentication modal, dashboard shell, cards, colors, gradients, typography, spacing, glassmorphism, shadows, animations, sidebar, navbar, and overall visual language are already completed.

Your responsibility is to EXTEND the existing design system.

Every new page must look like it was designed by the same designer.

Maintain COMPLETE consistency with:

• Dark premium fintech appearance
• Blue + Gold accent colors
• Glassmorphism
• Soft shadows
• Rounded cards
• Gradient buttons
• Premium animations
• Transparent layered UI
• Existing spacing
• Existing typography
• Existing dashboard layout

Never introduce another design language.

--------------------------------------------------

PROJECT

TaboFins

A digital cooperative finance ecosystem for Africa combining

• Digital Njangi
• Group Savings
• Wallets
• P2P
• Cross-border transfers
• Marketplace
• Escrow
• KYC
• Community Finance

--------------------------------------------------

IMPORTANT

DO NOT TOUCH

Landing Page

Login

Signup

Dashboard layout

Sidebar

Navbar

Existing components

Only extend them.

Never break existing code.

--------------------------------------------------

ONLY BUILD FRONTEND. for now

Ignore backend.

Ignore APIs.

Ignore Prisma.

Ignore authentication logic.

Use mock data where necessary.

--------------------------------------------------

Every page must already be connected to routing.

Every page must be fully responsive.

Desktop

Tablet

Mobile

Everything must work.

--------------------------------------------------

Create reusable components.

Never duplicate code.

--------------------------------------------------

Keep using:

Next.js App Router

TypeScript

Existing component structure

Existing folder structure

--------------------------------------------------

PHASE 1

Improve dashboard consistency.

Fix sidebar.

The sidebar MUST remain visible across every authenticated page.

Dashboard

Wallet

Njangi

Savings

Marketplace

P2P

Cross Border

Notifications

Profile

Settings



Everything inside the authenticated application uses exactly the same dashboard shell.

--------------------------------------------------

PAGES TO ADD

1.

P2P Exchange

Design inspired by Binance P2P.

NOT copying Binance.

Inspired by the workflow.

Include:

Buy tab

Sell tab

Currency selector

XAF

NGN

USDT

Filters

Payment methods

Verified users

Online status

Ratings

Completion rate

Orders

Trade history

Escrow status

Order status

Transaction details

Order details page

Trade progress timeline

Buyer confirmation

Seller confirmation

Release funds

Appeal button

Chat panel between buyer and seller

Dispute page

Dispute timeline

Evidence upload placeholder

Moderator messages

Trade completion screen

Responsive tables

Premium cards

--------------------------------------------------

2.

Cross Border

Inspired by Binance Send.

Features

Country selector

Currency selector

Live exchange preview

Fee preview

Estimated arrival

Transaction timeline

Transfer history

Beneficiary management

Recipient list

Saved recipients

Recent transfers

Status tracking

Receipt page

--------------------------------------------------

3.

Marketplace

these different domain under market place 1. *Goods ( physical products)*
Electronics
Phones & Accessories
Fashion
Home & Furniture
Beauty & Cosmetics 
Groceries
Vehicles
Property
Agricultural Products
Books

2.  *Services* 

Hairdressing
Barbing
Cleaning
Electrical Repairs
Plumbing
Driving
Delivery
Mechanics
Photography
Videography
Event Planning
Catering
Tailoring
Fitness Trainers
Licenced nurses3. 🎓 *Learning* 

Home Tutors
Online Courses
E-Books
Driving Schools


4. 💼 *Jobs & Gigs*

Full-time Jobs
Part-time Jobs
One-time Tasks
Freelance Projects


5. 🏠 *Property* 

Houses for Rent
Houses for Sale
Land
Office Spaces
Short Stays
Vacation Rentals
Warehouses6. 🚗 *Mobility/Transportation services:*

Car Rental
Bike Rental
Truck Hire
Logistics
Moving Services


7. 🎫 *Events & Tickets* 

Concerts
Conferences
Sports Events
Cinema
Bus Tickets
Flight Bookings

Features

Browse products

Categories the categories were given above

Search

Filters

Product details

Seller profile

Seller rating

Related products

Image gallery/ video 5mins max describing what you do 

Favourite products

My listings

Create listing

Edit listing

Delete listing

Chat with seller

Offer button

Report listing

--------------------------------------------------

4.

Chat System

Reusable.

Works across:

Marketplace

Njangi Groups

P2P

Cross Border

Features

Conversation list

Unread badge

Typing indicator

Online status

Image placeholder

File placeholder

Message timestamps

Pinned messages

Group chat

Private chat

Search messages

--------------------------------------------------

5.

Njangi Improvements

To the already existing Njangi page include


Wallet balance

Reserve wallet

Penalty log

Group chat
Admin actions

Conflict Resolution page

Conflict timeline

Pause Njangi 

Resume Njangi

Contribution reminders

Penalty history

--------------------------------------------------

Penalty Logic UI

Display

5% penalty

Show breakdown

30%

System

30%

Beneficiary

40%

Reserve wallet

Reserve wallet money is distributed to all members at the end of the njangi when last person eats

Only frontend visualization.

--------------------------------------------------

6. To the existing savings structure adjust it like this 

Personal Savings

Manual deduction

Automatic deduction

Lock duration selector

Interest preview

Withdrawal preview

Penalty preview

Early withdrawal warning

Group Savings

Members

Goal

Locked duration

Progress

Withdrawals

Contribution schedule

Leaving group warning

Display:

Leaving group

50% forfeiture

Half goes to members

Half goes to system

UI only.

--------------------------------------------------

7. to the existing wallet structure add

Create wallet

Connect external wallet

Wallet balances

Live conversion

Instead of approximate USD

Display real-time exchange placeholder.

Supported

XAF

NGN

USDT

Wallet activity

Transaction history (edit transaction history such that it is only vsible when the user clicks on the button)



--------------------------------------------------

8.

KYC

User side

Verification status

Upload ID

Upload selfie

Address

Phone verification

Email verification

Progress tracker

Approval pending

Rejected

Approved

--------------------------------------------------

9.

Front Desk Dashboard

Separate page.

Used by verification officers.

Queue

Pending KYC

Approve

Reject

Preview documents

Search

Filter

Verification history

--------------------------------------------------

10. Add the referrals to the already existing profile page

Referral System

Referral dashboard

Referral code

Referral link

Invite friends

Referral tree

Rewards

Commission history

Leaderboard

--------------------------------------------------

11. To the already existing Notifications just add this ones

Grouped notifications

P2P

Marketplace

Transfers

Referral

--------------------------------------------------

12. This is on the signup page please adjust the signup page to have a section for terms and conditions 

Terms & Conditions

Beautiful readable page.

Search

Table of contents

Sticky navigation

Privacy

Community rules

KYC

Escrow

Disputes

--------------------------------------------------

13.

Settings

Theme

Language

Currency

Notifications

Security

Devices

Password

Delete account

--------------------------------------------------

Throughout the application use realistic financial dashboards.

Never leave blank pages.

Every page should feel production ready.

--------------------------------------------------

OUTPUT FORMAT

Do NOT generate everything in one response.

Generate one complete module at a time.

Each module must include:

Folder structure

Components

Pages

Routing

Imports

Exports

Styling

Reusable components

Before moving to the next module ensure the previous module is complete.

Never regenerate existing files unnecessarily.

Always extend the current codebase.

Maintain 100% design consistency with the existing TaboFins frontend.