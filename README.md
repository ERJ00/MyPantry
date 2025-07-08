# MyPantry – Smart Kitchen Inventory App

**MyPantry** is a mobile app that helps users organize their kitchen inventory, monitor expiration dates, and minimize food waste all wrapped in a clean, pastel-themed interface. With simple CRUD functionality, beautiful design, and powerful features, it’s perfect for everyday users who want to keep their pantry in check.

---

## 🌟 Features

### ✅ Core Functionality
- Add pantry items (name, category, quantity, expiry date, photo, and etc.)
- View all items in a searchable, filterable list
- Edit or delete existing items
- Color-coded expiry warnings (green = fresh, orange = expiring, red = expired)
- Dashboard with key stats (e.g., total items, expiring soon)

### 🎨 UI Highlights
- Soft pastel color theme with cream background and white cards
- Rounded corners, subtle shadows, and clean layout
- Fonts: Poppins / Nunito for modern, friendly readability
- Responsive layout with attention to padding and hierarchy

### 🧠 Advanced Features (Planned)
- Push notifications for upcoming expirations
- Barcode scanner to auto-fill item info
- Grocery list generator
- Meal planner suggestions based on inventory
- Cloud sync using Firebase or Supabase
- Offline mode with sync on reconnect
- User authentication and multi-device support

---

## 🛠️ Tech Stack

| Layer      | Technology                     |
|------------|--------------------------------|
| Frontend   | React Native (Expo)            |
| Backend    | Firebase / Supabase            |
| Database   | Firestore / SQLite             |
| Auth       | Firebase Auth / Supabase Auth  |
| Styling    | Nativewind / Styled Components |
| Fonts      | Poppins / Nunito               |

---

## 📅 Project Milestones

| Milestone                                | Status        |
|------------------------------------------|---------------|
| UI Design (all main screens)             | 🔄 In Progress |
| Basic CRUD Functionality                 | ⏳ Planned     |
| Local Storage                            | ⏳ Planned     |
| Expiry Warnings (visual badges)          | ⏳ Planned     |
| Push Notifications                       | ⏳ Planned     |
| Authentication (Firebase/Supabase)       | ⏳ Planned     |
| Cloud Sync (Firestore/Supabase)          | ⏳ Planned     |
| Barcode Scanner                          | ⏳ Planned     |
| Grocery List Generator                   | ⏳ Planned     |
| Offline Mode with Sync                   | ⏳ Planned     |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/mypantry.git
cd mypantry

# Install dependencies
npm install
# or
yarn install

# Run the app
npx expo start
